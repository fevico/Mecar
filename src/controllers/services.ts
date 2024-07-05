import { RequestHandler } from "express";
import categoryModel from "src/model/category";
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

export const getAllServices: RequestHandler = async (req, res) => {
    try {
        const services = await serviceModel.find()
            .populate({
                path: 'mechanicId',
                select: 'firstName lastName'
            })
            .populate({
                path: 'category',
                select: 'name'
            })
        return res.status(200).json({ services });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getServiceById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const service = await serviceModel.findById(id)
        .populate({
            path: 'mechanicId',
            select: 'firstName lastName'
        })
        .populate({
            path: 'category',
            select: 'name'
        })
    if (!service) return res.status(404).json({ message: "Service not found" });
    return res.status(200).json({ service})
}

export const getServicesByMechanicId: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const mechanic = await userModel.findById(id);
    if (!mechanic) return res.status(404).json({ message: "Mechanic not found" });
    const services = await serviceModel.find({ mechanicId: id }).populate({
        path: 'mechanicId',
        select: 'firstName lastName'
    })
        .populate({
            path: 'category',
            select: 'name'
        })
    if(!services) return res.status(404).json({ message: "Service not found" });
    return res.status(200).json({ services });
}

export const getServicesByCategory: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const findCatgory = await categoryModel.findById(id);
    if (!findCatgory) return res.status(404).json({ message: "Category not found" });
    const category = await serviceModel.find({ category: id });
    if (!category) return res.status(404).json({ message: "Service not found" });
    return res.status(200).json({ category });
}

// export const getServicesByCategoryAndMechanicId: RequestHandler = async (req, res) => {
//     const { id } = req.params;
//     let findCatgoryOrMechanic = await categoryModel.findById(id);
//     if(!findCatgoryOrMechanic){
//         findCatgoryOrMechanic = await userModel.findById(id);
//         if(!findCatgoryOrMechanic) return res.status(404).json({ message: "Mechanic not found" });
//     }
//     if(!findCatgoryOrMechanic) return res.status(404).json({ message: "Category not found" });
//     const category = await serviceModel.find({ category: id, mechanicId: id });
//     if (!category) return res.status(404).json({ message: "Service not found" });
//     return res.status(200).json({ category });
// }

// export const updateService: RequestHandler = async (req, res) => {
//     const { id } = req.params;
//     const { title, category, description, price, workDays } = req.body;
//     const mechanic = req.user.id;
//     const mehanicId = await serviceModel.findOne({mechanicId: mechanic});
//     if (!mehanicId) return res.status(404).json({ message: "Unauthorized access, you are not authorized to perform this action" });
//     const updateService = await serviceModel.findByIdAndUpdate(id, { title, category, description, price, workDays }, { new: true });
//     if (!updateService) return res.status(404).json({ message: "Service not found" });
//     return res.status(200).json({ message: "Service updated successfully", updateService });
// }

export const updateService: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { title, category, description, price, workDays } = req.body;
    const mechanic = req.user.id;

    try {
        // Check if the logged-in user is the owner of the service
        const service = await serviceModel.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        if (service.mechanicId.toString() !== mechanic) {
            return res.status(403).json({ message: "Unauthorized access, you are not authorized to perform this action" });
        }

        // Update the service
        const updatedService = await serviceModel.findByIdAndUpdate(id, { title, category, description, price, workDays }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        return res.status(200).json({ message: "Service updated successfully", updatedService });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
    
export const deleteService: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const mechanic = req.user.id;
    const mehanicId = await serviceModel.findOne({mechanicId: mechanic});
    if (!mehanicId) return res.status(404).json({ message: "Unauthorized access, you are not authorized to perform this action" });
    const deleteService = await serviceModel.findByIdAndDelete(id);
    if (!deleteService) return res.status(404).json({ message: "Service not found" });
    return res.status(200).json({ message: "Service deleted successfully" });
}