import { AuthService } from "./auth.service.js";

const authService = new AuthService()

export class AuthController {
    async createToken(req, res) {
        try {
            const token = await authService.createToken(req.body);
            return res.status(201).json({
                success:true,
                message:'Login Success',
                data: token
            })
        } catch (err) {
            return res.status(400).json({
                success:false,
                message:"Invalid Credential",
            })
        }
       
    }

    async refreshToken(req, res) {
        try {
            const token = await authService.refreshToken(req.headers);
            return res.status(201).json({
                success:true,
                message:'Token Created',
                data: token
            })
        } catch (err) {
            return res.status(400).json({
                success:false,
                message:"Invalid Credential",
            })
        }
       
    }
}
