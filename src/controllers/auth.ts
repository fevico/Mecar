import { RequestHandler } from "express";
import userModel from "src/model/carOwner";

export const create: RequestHandler = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber} = req.body
    const user = await userModel.create({firstName, lastName, email, password, phoneNumber})
    res.status(201).json({user})
}