import express from 'express';
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Your React dev server
    credentials: true
  }));
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'elevate',
  password: 'your_password',
  port: 5432,
});

// ... rest of your API code ...

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));