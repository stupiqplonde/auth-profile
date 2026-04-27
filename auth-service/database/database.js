import pg from 'pg';
import bcrypt from "bcrypt"
import "dotenv/config"

const {Pool} = pg;

let pool;

export async function initDb(){
    pool = new Pool({connctionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}});

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            login TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return pool;
}

export function getDb(){
    return pool;
}