import Fastify from "fastify";
import "dotenv/config";
import cors from "@fastify/cors"
import routers from "./routers/routers.js"
import { verifyJWT } from "./middleware/auth.js"  

import { initDb } from "./database/database.js";

const port = process.env.PROFILE_PORT || 3003;

const fastify = Fastify({ logger: false });

await initDb();

await fastify.decorate('verifyJWT', verifyJWT);

await fastify.register(cors, {origin: true});
await fastify.register(routers);

await fastify.listen({ port });
console.log(`Profile service is running on http://localhost:${port}`);