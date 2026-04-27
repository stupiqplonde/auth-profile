import express from "express";
import pg from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDb } from "../database/database.js";

const router = express.Router()

router.post('/register', async (req, res) => {
    const {login, password} = req.body

    if(!login || !password){
        res.json({seccess: false, error: "unknown"});
    }

    if(password.length < 4){
        res.json({success: false, error: "Password < 4 symbols!"})
    }

    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.query(`
        INSERT INTO users(login, password) VALUES($1, $2) RETURNING id, login, created_at
        `, [login, hashedPassword]
    );

    const user = result.rows[0];

    fetch(`${process.env.PROFILE_SERVICE_URL}/api/profile`,
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: user.id, full_name: user.login})
        }
    ).catch(() => {})

    res.json({success: true, message: "success"});
});

router.post('/login', async (req, res) => {
    const {login, password} = req.body
    const db = getDb();

    if(!login){
        res.json({success: false, error: "None login"})
    }

    const user = await db.query(`SELECT * FROM user WHERE login = $1`, [login]);

    const user_login = user.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user_login.password)

    if(isPasswordValid){
        res.json({success: true, message: "Auth success"})
    }

    const token = jwt.sign(
        { userID: user_login.id, login: user_login.login }, 
        process.env.JWT_SECRET, 
        {expiresIn: '1h'}
    );

    if(isPasswordValid){
        res.json({success: true, token, user_login: {id: user_login.id, login: user_login.login, created_at: user_login.created_at}});
    }
});


export default router;