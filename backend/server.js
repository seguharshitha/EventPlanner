require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin === "*" ? true : allowedOrigin }));
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

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const validationError = validatePayload(role, String(email || "").trim().toLowerCase(), password);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existing = await pool.query(
      "SELECT id FROM eventplanner.users WHERE role = $1 AND email = $2",
      [role, normalizedEmail]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Account already exists for this role" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO eventplanner.users (role, email, password_hash) VALUES ($1, $2, $3)",
      [role, normalizedEmail, passwordHash]
    );

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
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

    const userResult = await pool.query(
      "SELECT id, password_hash FROM eventplanner.users WHERE role = $1 AND email = $2",
      [role, normalizedEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, userResult.rows[0].password_hash);
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
