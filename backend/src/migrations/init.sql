-- Migration Script untuk Neon PostgreSQL
-- Dibuat: 2026-06-07

-- Drop table jika sudah ada (hati-hati di production!)
DROP TABLE IF EXISTS users;

-- Buat table users dengan struktur yang sama
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat index untuk performa
CREATE INDEX idx_users_email ON users(email);

-- Insert sample data (opsional)
INSERT INTO users (name, email, address) VALUES
  ('John Doe', 'john@example.com', '123 Main St, City, Country'),
  ('Jane Smith', 'jane@example.com', '456 Oak Ave, Town, Country'),
  ('Bob Johnson', 'bob@example.com', '789 Pine Rd, Village, Country');

-- Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
  ON users FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
