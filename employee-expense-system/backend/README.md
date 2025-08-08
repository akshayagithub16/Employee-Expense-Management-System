# Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create MySQL database:
   ```sql
   CREATE DATABASE expense_db;
   ```

3. Run the SQL to create tables:

   ```sql
   USE expense_db;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(150) UNIQUE,
     password VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE expenses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     title VARCHAR(255),
     amount DECIMAL(10,2),
     category VARCHAR(100),
     description TEXT,
     date DATE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

4. Copy .env and fill values (DB credentials, JWT_SECRET).

5. Start dev server:
   ```bash
   npm run dev
   ```
