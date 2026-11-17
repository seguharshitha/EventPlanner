# EventPlanner Auth Backend

This backend stores login details in PostgreSQL and validates login/register from your frontend.

## 1) Install and configure

1. Open terminal in `backend`.
2. Run:
   - `npm install`
3. Copy `.env.example` to `.env` and set values:
   - `PORT=4000`
  - `DATABASE_URL=postgresql://username:password@localhost:5432/eventplanner`
   - `ALLOWED_ORIGIN=http://127.0.0.1:5500`

### Optional: Supabase HTTPS mode (recommended when 5432/6543 are blocked)

If your network blocks outbound PostgreSQL ports, this backend can query Supabase over HTTPS (port 443).

Add these to `.env`:
- `SUPABASE_URL=https://<project-ref>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=<service-role-key>`

Notes:
- Keep `DATABASE_URL` for local/direct mode fallback.
- When both `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are present, server uses Supabase HTTP mode automatically.
- Use service role key only on backend. Never expose it in frontend code.

## 2) SQL folder structure

- `sql/tables`: table creation scripts
- `sql/seeds`: seed scripts
- `sql/migrations`: migration scripts

Run SQL in this order:
- `sql/tables/000_create_schema.sql` (skip if schema already exists)
- `sql/tables/create_users.sql`
- `sql/seeds/001_seed_test_users.sql` (optional, for testing)

Test accounts from optional seed script:
- customer: `customer.test@eventplanner.com` / `Pass@123`
- client: `client.test@eventplanner.com` / `Pass@123`

## 3) Start backend

Run:
- `npm start`

Health check:
- `GET http://localhost:4000/api/health`

Health response includes mode:
- `supabase-http` when using Supabase HTTPS mode
- `postgres-direct` when using direct PostgreSQL connection

## API endpoints

- `POST /api/auth/register`
  - body: `{ "role": "customer|client", "email": "user@x.com", "password": "Pass@123" }`
- `POST /api/auth/login`
  - body: `{ "role": "customer|client", "email": "user@x.com", "password": "Pass@123" }`

Passwords are hashed using bcrypt before storage.

## Access from all systems

Use a shared/hosted PostgreSQL instance and host this backend publicly.

Then update frontend API URL in `Login/login.js`:
- `const API_BASE_URL = "https://your-backend-domain"`

This makes every system use the same shared database.

## Cloud provisioning guide

See `CLOUD_POSTGRES_SETUP.md` for step-by-step cloud PostgreSQL setup and future reuse.
