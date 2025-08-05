import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        passWord: { type: String },
    },
    { timestamps: true }
);

export const AuthModel = mongoose.model("AuthModel", authSchema, "auth");
