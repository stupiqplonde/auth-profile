import jwt from "jsonwebtoken";

export function verifyJWT(req, reply){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({ success: false, error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch {
        return reply.status(401).send({ success: false, error: "Invalid token" });
    }
}