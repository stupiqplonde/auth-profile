import pg from 'pg';
import "dotenv/config"

const {Pool} = pg;

let pool;

export async function initDb(){
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE NOT NULL,
            full_name TEXT,
            bio TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return pool;
}

export function getDb(){
    return pool;
}