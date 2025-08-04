import { ProfileService } from "./profile.service.js";

const profileService = new ProfileService();
export class ProfileController {
    async createCustomer(req, res) {
        try {
            const result = await profileService.createCustomer(req.body);
            return res.status(201).json({
                success: true,
                message: "Customer create successfully",
                data: result,
            });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Email Already Exist",
                });
            }
        }
    }

    async updateCustomer(req, res) {
        try {
            const result = await profileService.updateCustomer(req.body);
            return res.status(202).json({
                success: true,
                message: "Customer Update Successfully",
                data: result,
            });
        } catch (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                message: err.message || "Update failed",
            });
        }
    }
}
