import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { customerMiddleWare } from "./modules/profile/profile.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { validateToken } from "./index.middleware.js";
import { addressRouter } from "./modules/address/address.routes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("machine rest");
});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/address", addressRouter);
app.use("/customer", validateToken, customerMiddleWare);

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URL;

mongoose
    .connect(URI)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(`Mongodb Connection Error : ${err}`));

app.listen(PORT, () => console.log(`server running on ${PORT}`));
