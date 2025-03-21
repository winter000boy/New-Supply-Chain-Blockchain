CREATE TABLE users (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing ID
    email VARCHAR(255) UNIQUE NOT NULL, -- User email (must be unique)
    password VARCHAR(255) NOT NULL, -- Hashed password
    role VARCHAR(50) NOT NULL,      -- Role (e.g., admin, supplier, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for user creation
);