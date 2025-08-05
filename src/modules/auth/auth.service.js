import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { AuthModel } from "./auth.model.js";
dotenv.config();

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
        const decode = await jwt.verify(token, refreshSecretKey);
        const newAccessToken = await jwt.sign({ name: decode.name, email: decode.email }, acessSecretKey, {
            expiresIn: "15m",
        });
        return { newAccessToken };
    };

    userSignup = async (body) => {
        const passWord = body.passWord;
        const saltRound = 10;
        const encrypt = await bcrypt.hash(passWord, saltRound);

        const user = {
            userName: body.userName,
            passWord: encrypt,
        };

        await AuthModel(user).save();

        return "Success";
    };

    userLogin = async (body) => {
        const user = await AuthModel.findOne({ userName: body.userName });
        if (!user) throw new Error("User Not Found");

        const isMatch = await bcrypt.compare(body.passWord, user.passWord);

        if (isMatch) {
            return "Success";
        } else {
            throw new Error("Incorrect Password");
        }
    };
}
