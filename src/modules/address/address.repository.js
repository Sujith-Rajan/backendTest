import { AddressModel } from "./address.model.js"

export class AddressRepository {
    addAddress = async (body) =>  {
        const result = await  AddressModel(body).save()
        return result
    }
}
