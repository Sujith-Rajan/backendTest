import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const acessSecretKey = process.env.ACCESS_TOKEN_SECRET;

export const validateToken = async (req, res, next) => {
    const token = req.headers.token;
    if(!token) {
        return res.status(401).json({
            success: false,
            message:'Missing Credentials'
        })
    }
    try {
        const user = await jwt.verify(token, acessSecretKey);
        req.userDetails = user
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message:'Forbidden'
        })
    }
};
