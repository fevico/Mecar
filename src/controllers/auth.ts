import { RequestHandler } from "express";
import userModel from "src/model/carOwner";
import mechanicModel from "src/model/mechanic";
import { sendErrorRes } from "src/utils/helper";

export const create: RequestHandler = async (req, res) => {
    
        const { firstName, lastName, email, password, phoneNumber, role } = req.body;

        if (!role) {
            return sendErrorRes(res, "Role is required", 400)
        }

        let user;
        if (role === 'carOwner') {
            user = await userModel.create({ firstName, lastName, email, password, phoneNumber, role });
        } else if (role === 'mechanic') {
            user = await mechanicModel.create({ firstName, lastName, email, password, phoneNumber, role });
        } else {
            return sendErrorRes(res, "Role is required", 400)
        }

        res.status(201).json({ user });
    
}