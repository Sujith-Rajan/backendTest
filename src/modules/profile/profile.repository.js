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

    async getCustomer(query) {
        const customer = await CustomerModel.aggregate([
            {
                $match: query.id,
            },
            {
                $facet: {
                    data: [
                        {
                            $lookup: {
                                from: "addressTable",
                                localField: "_id",
                                foreignField: "userId",
                                as: "address",
                            },
                        },
                        { $unwind: { path: "$address", preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                _id: 1,
                                email: 1,
                                name: { $ifNull: ["$nickName", "$name"] },
                                address: "$address",
                                isOver: {
                                    $switch: {
                                        branches: [
                                            {
                                                case: {
                                                    $and: [{ $gte: ["$age", 10] }, { $lt: ["$age", 20] }],
                                                },
                                                then: "Minor",
                                            },
                                            {
                                                case: { $and: [{ $gte: ["$age", 20] }, { $lt: ["$age", 30] }] },
                                                then: "Teen",
                                            },
                                            { case: { $gte: ["$age", 30] }, then: "Young" },
                                        ],
                                        default: "Unknown",
                                    },
                                },
                            },
                        },
                        {
                            $sort: { email: 1 },
                        },
                        {
                            $skip: parseInt(query.offset),
                        },
                        {
                            $limit: parseInt(query.limit),
                        },
                    ],
                    count: [
                        {
                            $count: "toatlCount",
                        },
                    ],
                },
            },
        ]);
        return customer[0];
    }

    async getCustomerById(id) {
        try {
            const customer = await CustomerModel.findById(id);
            if (!customer) throw new Error("No User");
            return customer;
        } catch (err) {
            throw new Error(err);
        }
    }
}
