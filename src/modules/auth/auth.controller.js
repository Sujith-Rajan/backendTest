import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {
    async userSignup(req, res) {
        try {
            const user = await authService.userSignup(req.body);
            return res.status(201).json({
                success: true,
                message:"Signup Successfully"
            });
        } catch (err) {
            return res.status(401).json({
                success: false,
                message:"Signup Failed"
            });
        }
    }

    async userLogin(req, res) {
        try {
            const user = await authService.userLogin(req.body);
            return res.status(201).json({
                success: true,
                message:"Login Successfully"
            });
        } catch (err) {
            return res.status(401).json({
                success: false,
                message:"Login Failed"
            });
        }
    }

    async createToken(req, res) {
        try {
            const token = await authService.createToken(req.body);
            return res.status(201).json({
                success: true,
                message: "Login Success",
                data: token,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credential",
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const token = await authService.refreshToken(req.headers);
            return res.status(201).json({
                success: true,
                message: "Token Created",
                data: token,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credential",
            });
        }
    }
}
