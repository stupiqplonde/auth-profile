import Fastify from "fastify";
import "dotenv/config";
import cors from "@fastify/cors"
import routers from "./routers/routers.js"
import { verifyJWT } from "./middleware/auth.js"  

import { initDb } from "./database/database";

const port = process.env.PROFILE_PORT || 3001;

const fastify = Fastify({loger: false});

await initDb();

await fastify.register(routers);

await fastify.decorate('verifyJWT', verifyJWT);

await fastify.register(cors, {origin: true});

fastify.listen({port}, () => { console.log(`http://localhost:${port}`)});