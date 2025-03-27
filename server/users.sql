CREATE TABLE users (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing ID
    email VARCHAR(255) UNIQUE NOT NULL,            -- User email (must be unique)
    password VARCHAR(255) NOT NULL,                -- Hashed password
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'admin', 'supplier', 'manufacturer', 'distributor', 'retailer'
    )),                                            -- Role with restricted values
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for user creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for last update
    deleted_at TIMESTAMP DEFAULT NULL              -- Timestamp for soft deletion
);

-- Add an index on the email column for faster lookups
CREATE INDEX idx_users_email ON users (email);