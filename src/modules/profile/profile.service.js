import { ProfileRepository } from "./profile.repository.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const profileRepo = new ProfileRepository();
export class ProfileService {
    async createCustomer(body) {
        const res = await profileRepo.createCustomer(body);
        return res;
    }

    async updateCustomer(body) {
        const res = await profileRepo.updateCustomer(body);
        return res;
    }

    async getCustomer(query) {
        let filtter = {};
        const pageNumber = query.pageNumber;
        const pageSize = query.pageSize;

        if ("id" in query) {
            filtter.id = { _id: new ObjectId(query.id) };
        } else {
            filtter.id = {};
        }

        if (pageNumber && pageSize) {
            filtter.limit = parseInt(pageSize);
            filtter.offset = (parseInt(pageNumber) - 1) * pageSize;
        } else {
            filtter.limit = 10;
            filtter.offset = 0;
        }

        const res = await profileRepo.getCustomer(filtter);
        return res;
    }
}
