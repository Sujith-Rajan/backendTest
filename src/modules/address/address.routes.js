import express from "express";
import { AddressController } from "./address.controller.js";

const addressController = new AddressController();

export const addressRouter = express.Router();
addressRouter.post("/", (req, res) => addressController.addAddress(req, res));
