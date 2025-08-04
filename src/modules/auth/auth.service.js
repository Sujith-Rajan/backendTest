import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
const acessSecretKey = process.env.ACCESS_TOKEN_SECRET;
export class AuthService {
    createToken = async (body) => {
        const refreshToken = await jwt.sign(body, refreshSecretKey, { expiresIn: "30d" });
        const acessToken = await jwt.sign(body, acessSecretKey, { expiresIn: "15m" });
        return { refreshToken, acessToken };
    };

    refreshToken = async (headers) => {
        const token = headers.token;
        const decode = await jwt.verify(token,refreshSecretKey)
        const newAccessToken = await jwt.sign({name:decode.name,email:decode.email},acessSecretKey,{ expiresIn: "15m" })
        return { newAccessToken };
    };
}
