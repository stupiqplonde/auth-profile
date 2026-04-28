import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDb } from "../database/database.js";

const router = express.Router()

router.post('/register', async (req, res) => {
    const {login, password} = req.body

    if(!login || !password){
        return res.json({success: false, error: "Login and password are required"});
    }

    if(password.length < 4){
        return res.json({success: false, error: "Password must be at least 4 characters"})
    }

    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.query(`
        INSERT INTO users(login, password) VALUES($1, $2) RETURNING id, login, created_at
        `, [login, hashedPassword]
    );

    const user = result.rows[0];
    res.json({success: true, message: "success"});
});

router.post('/login', async (req, res) => {
    const {login, password} = req.body

    if(!login || !password){
        return res.json({success: false, error: "Login and password are required"})
    }

    const db = getDb();
    const user = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);

    if (!user.rows.length) {
        return res.json({ success: false, error: "User not found" });
    }

    const user_login = user.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user_login.password)

    if(!isPasswordValid){
        return res.json({success: false, error: "Invalid password"})
    }

    const token = jwt.sign(
        { userId: user_login.id, login: user_login.login }, 
        process.env.JWT_SECRET, 
        {expiresIn: '1h'}
    );

    return res.json({
        success: true,
        token,
        user: {
            id: user_login.id,
            login: user_login.login,
            created_at: user_login.created_at
        }
    });
});


export default router;