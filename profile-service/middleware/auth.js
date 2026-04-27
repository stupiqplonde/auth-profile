import jwt from "jsonwebtoken";

export function verifyJWT(req, reply){
    const authHeader = req.header.authorization;

    const token = authHeader.split(' '[1])

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
}