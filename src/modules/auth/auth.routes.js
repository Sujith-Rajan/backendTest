import express from "express";
import { AuthController } from "./auth.controller.js";

const authController = new AuthController()

export const authRouter = express.Router()

    .post("/signup",(req, res) => authController.userSignup(req, res))
    .post("/login",(req, res) => authController.userLogin(req, res))
    .post("/", (req, res) => authController.createToken(req, res))
    .put("/refresh", (req, res) => authController.refreshToken(req, res))
