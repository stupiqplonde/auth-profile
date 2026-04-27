import express from "express"
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname, "../public", "index.html");
});

router.get('/dashboard', (req, res) => {
    res.sendFile(__dirname, "../public", "dashboard.html");
});

export default router