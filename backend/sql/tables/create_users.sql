CREATE TABLE IF NOT EXISTS eventplanner.users (
  id BIGSERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_users_role CHECK (role IN ('customer', 'client')),
  CONSTRAINT uq_users_role_email UNIQUE (role, email)
);