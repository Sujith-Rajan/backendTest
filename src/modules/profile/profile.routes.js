import express from "express";
import { ProfileController } from "./profile.controller.js";

const profileController = new ProfileController();

export const customerMiddleWare = express.Router();

customerMiddleWare
    .post("/", (req, res) => profileController.createCustomer(req, res))
    .get("/", (req, res) => profileController.getCustomer(req, res))
    .put("/", (req, res) => profileController.updateCustomer(req, res));
// .delete("/", profileController);
