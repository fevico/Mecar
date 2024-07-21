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

export const findNearestServices: RequestHandler = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate input
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        // Perform the geospatial query
        const services = await serviceModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 5000, // 5 km
                    $minDistance: 100   // 100 m
                }
            }
        }).limit(10); // Limit the number of results to 10

        return res.status(200).json({ services });
    } catch (error) {
        console.error('Error finding nearest services:', error);
        return res.status(500).json({ error: 'An error occurred while finding nearest services' });
    }
}

// export const findNearestServices: RequestHandler = async (req, res) => {
//     const { latitude, longitude, title, category } = req.query;

//     // Build the query object
//     const query: any = {
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [Number(longitude), Number(latitude)],
//                 },
//                 $maxDistance: 5000, // 5 km
//                 $minDistance: 100,  // 100 m
//             }
//         }
//     };

//     // Add title filter if provided
//     if (title) {
//         query.title = { $regex: title, $options: 'i' }; // case-insensitive match
//     }

//     // Add category filter if provided
//     if (category) {
//         query.category = { $regex: category, $options: 'i' }; // case-insensitive match
//     }

//     try {
//         const services = await serviceModel.find(query).limit(10);
//         return res.status(200).json({ services });
//     } catch (error) {
//         console.error('Error finding services:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };