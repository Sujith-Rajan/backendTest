import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        address: { type: String },
        city: { type: String },
        userId: { type: mongoose.Types.ObjectId, required: true, unique: true },
    },
    { timestamps: true }
);

export const AddressModel = mongoose.model("AddressModel", addressSchema, "addressTable");
