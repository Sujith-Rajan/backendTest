import { ProfileRepository } from "./profile.repository.js";

const profileRepo = new ProfileRepository();
export class ProfileService {
    async createCustomer(body) {
        const res = await profileRepo.createCustomer(body);
        return res
    }

    async updateCustomer(body) {
        const res = await profileRepo.updateCustomer(body);
        return res
    }
}
