import { AddressRepository } from "./address.repository.js";

const addressRepositry = new AddressRepository();

export class AddressService {
    addAddress = async (body) => {
        const result = await addressRepositry.addAddress(body);
        return result;
    };
}
