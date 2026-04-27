import pg from 'pg';
import bcrypt from "bcrypt"
import "dotenv/config"

const {Pool} = pg;

let pool;

export async function initDb(){
    pool = new Pool({connctionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}});

    await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE NOT NULL,
            full_name TEXT,
            bio TEXT,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            update_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return pool;
}

export function getDb(){
    return pool;
}