import express from "express";
import { AuthController } from "./auth.controller.js";

const authController = new AuthController()

export const authRouter = express.Router();

authRouter.post("/", (req, res) => authController.createToken(req, res));
authRouter.put("/refresh", (req, res) => authController.refreshToken(req, res))
