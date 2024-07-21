import { RequestHandler } from "express";
import orderModel from "src/model/order";
import serviceModel from "src/model/services";
import { sendErrorRes } from "src/utils/helper";

export const requestService: RequestHandler = async (req, res) =>{
    const userId = req.user.id;
    const {carModel, serviceId, location, message} = req.body;
    const requestService = await orderModel.create({carModel, serviceId, location, message, userId});
    
    res.status(201).json(requestService);
}

export const getOrderService: RequestHandler = async (req, res) =>{
    // const userId = req.user.id;
    const orderService = await orderModel.find();
    res.status(200).json(orderService);
} 

export const getOrderServiceById: RequestHandler = async (req, res) =>{
    const {id} = req.params;
    const orderService = await orderModel.findById(id);
    res.status(200).json(orderService); 
}

export const getMechanicOrder: RequestHandler = async (req, res) =>{
    const userId = req.user.id;
    const serviceExist = await serviceModel.find({mechanicId: userId});
    if(!serviceExist) sendErrorRes(res, "No recent orde found!", 400);
    const mechanicOrder = await orderModel.find({serviceId: serviceExist});
    res.status(200).json(mechanicOrder);
    // const orderService = await orderModel.find({userId});
}