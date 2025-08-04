import createHttpError from "http-errors";
import CustomerModel from "./profile.model.js";

export class ProfileRepository {
    async createCustomer(body) {
        const customer = await new CustomerModel(body).save();
        return customer;
    }

    async updateCustomer(body) {
        if (!body.id) throw createHttpError(401, "Missig Required Field");
        const customer = await CustomerModel.findByIdAndUpdate(body.id, body, { new: true, runValidators: true });
        return customer;
    }
}
