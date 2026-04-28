import { getDb } from "../database/database.js";

export default async function profileRouters(fastify){
    fastify.get('/api/profile', {preHandler: fastify.verifyJWT}, async(req, reply) => {
        const userId = req.user.userId;

        const result = await getDb().query(
            `SELECT * FROM profiles WHERE user_id = $1`,
            [userId]
        );

        if(!result.rows.length){
            return reply.status(404).send({success: false});
        }

        return reply.status(200).send(
            {success: true, profile: result.rows[0]}
        );
    
    });

    fastify.post('/api/profile', {preHandler: fastify.verifyJWT}, async(req, reply) => {
        const userId = req.user.userId;
        const { full_name, bio } = req.body;

        const result = await getDb().query(
            `INSERT INTO profiles (user_id, full_name, bio)
             VALUES($1, $2, $3)
             ON CONFLICT (user_id) DO UPDATE SET
             full_name = EXCLUDED.full_name, 
             bio = EXCLUDED.bio,
             updated_at = CURRENT_TIMESTAMP
             RETURNING * 
            `,
            [userId, full_name, bio]
        );

        return reply.status(200).send(
            {success: true, profile: result.rows[0]}
        );
    
    });
}