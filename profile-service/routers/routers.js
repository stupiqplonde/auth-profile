import { getDb } from "../database/database.js";

export async function profileRouters(fastify){
    fastify.get('/api/profile', async(req, reply) => {
        const header = req.user.userId;
    });

    fastify.post('/api/profile', async(req, reply) => {
        const header = req.user.userId;
    });
}