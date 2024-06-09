import { RequestHandler } from "express";
import mechanicModel from "src/model/mechanic";
import serviceModel from "src/model/services";
import userModel from "src/model/user";

export const createService: RequestHandler = async (req, res) => {
    const { title, category, description, price, workDays } = req.body;
    const MechanicId = req.user.id;
    const mechanic = await userModel.findById(MechanicId);
    if (!mechanic) return res.status(404).json({ message: "Unauthorized access, you are not authorized to perform this action" });

    const service = new serviceModel({ title, category, description, price, workDays, mechanicId: MechanicId });
    await service.save();
    return res.status(201).json({ message: "Service created successfully", service });
}
