require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 4000;
const useSupabaseHttp = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

let pool = null;
let supabase = null;

if (useSupabaseHttp) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    db: { schema: "eventplanner" }
  });
} else {
  pool = require("./db");
}

const allowedOrigins = (process.env.ALLOWED_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  }
}));
app.use(express.json());

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$/;

function validatePayload(role, email, password) {
  if (!["customer", "client"].includes(role)) {
    return "Invalid role";
  }
  if (!email || !emailPattern.test(email)) {
    return "Invalid email format";
  }
  if (!password || !passwordPattern.test(password)) {
    return "Password must be 8-15 chars and include letter, number, special character";
  }
  return null;
}

async function findUserByRoleEmail(role, email) {
  if (useSupabaseHttp) {
    const { data, error } = await supabase
      .from("users")
      .select("id,password_hash")
      .eq("role", role)
      .eq("email", email)
      .limit(1);

    if (error) {
      throw error;
    }

    return data && data.length > 0 ? data[0] : null;
  }

  const result = await pool.query(
    "SELECT id, password_hash FROM eventplanner.users WHERE role = $1 AND email = $2",
    [role, email]
  );
  return result.rows[0] || null;
}

async function createUser(role, email, passwordHash) {
  if (useSupabaseHttp) {
    const { error } = await supabase
      .from("users")
      .insert([{ role, email, password_hash: passwordHash }]);

    if (error) {
      throw error;
    }
    return;
  }

  await pool.query(
    "INSERT INTO eventplanner.users (role, email, password_hash) VALUES ($1, $2, $3)",
    [role, email, passwordHash]
  );
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mode: useSupabaseHttp ? "supabase-http" : "postgres-direct" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const validationError = validatePayload(role, String(email || "").trim().toLowerCase(), password);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existing = await findUserByRoleEmail(role, normalizedEmail);
    if (existing) {
      return res.status(409).json({ message: "Account already exists for this role" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(role, normalizedEmail, passwordHash);

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    if (error && (error.code === "23505" || error.status === 409)) {
      return res.status(409).json({ message: "Account already exists for this role" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!["customer", "client"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await findUserByRoleEmail(role, normalizedEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Auth API running on port ${PORT}`);
});
