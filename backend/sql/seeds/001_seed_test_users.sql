-- Optional seed script for testing login flows.
-- Password for both users: Pass@123

INSERT INTO eventplanner.users (role, email, password_hash)
VALUES ('customer', 'customer.test@eventplanner.com', '$2a$10$dZSxnY2fxtE2IrO0Ogp5juOZbZhOf3ElECoOLUyJ6MTqhXYIVLFni')
ON CONFLICT (role, email) DO NOTHING;

INSERT INTO eventplanner.users (role, email, password_hash)
VALUES ('client', 'client.test@eventplanner.com', '$2a$10$dZSxnY2fxtE2IrO0Ogp5juOZbZhOf3ElECoOLUyJ6MTqhXYIVLFni')
ON CONFLICT (role, email) DO NOTHING;
