import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { customerMiddleWare } from "./modules/profile/profile.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { validateToken } from "./index.middleware.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("machine rest");
});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/customer", validateToken,customerMiddleWare);

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URL;

mongoose
    .connect(URI)
    .then(() => console.log("Mongodb Connected"))
    .catch(() => console.log("Mongodb Connection Error"));

app.listen(PORT, () => console.log(`server running on ${PORT}`));
