import express from 'express';
import "dotenv/config"
import apiRouter from "./routers/api.js";
import path from 'path';
import { fileURLToPath } from 'url';

import pageRouter from "./routers/pages.js";
import { initDb } from './database/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.AUTH_PORT || 3000;

await initDb();

// midlleware - промежуточные слоиS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pageRouter);
app.use("/api", apiRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

















