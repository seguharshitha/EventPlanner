# PostgreSQL Cloud Setup (Future-Proof)

Use this once to provision a shared PostgreSQL database so all systems can use the same backend.

## 1) Create cloud PostgreSQL service

Create a managed PostgreSQL instance on a provider such as Supabase, Neon, Railway, AWS RDS, Azure, or GCP.

Collect these values from service credentials:
- host
- port
- database name
- username
- password
- SSL requirement

## 2) Build app connection string

Set this in backend/.env:

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

If your provider requires SSL, keep using this backend behavior (non-localhost URL enables SSL automatically in db.js).

## 3) Create schema and tables

Run SQL files in order:

1. sql/tables/000_create_schema.sql
2. sql/tables/create_users.sql
3. sql/seeds/001_seed_test_users.sql (optional)

## 4) Run backend

1. Set backend/.env variables.
2. Run npm start in backend.
3. Verify: GET /api/health

## 5) Access from any system

1. Host backend on a public platform (Render, Railway, Azure, etc.).
2. Point Login/login.js API base URL to hosted backend URL.
3. Keep one shared cloud PostgreSQL instance for all systems.
