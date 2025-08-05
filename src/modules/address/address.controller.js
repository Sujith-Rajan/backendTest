import { AddressService } from "./address.service.js";

const addressService = new AddressService();
export class AddressController {
    addAddress = async (req, res) => {
        try{
            const result = await addressService.addAddress(req.body)
            return res.status(200).json({
                success: true,
                message: 'Address Added',
                data: result
            })

        }catch(err) {
            return res.status(err.code).json({
                success: false,
                message: 'Something went wrong'
            })
        }
       
        
    };
}
