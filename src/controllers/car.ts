import { RequestHandler } from "express";
import CarModel from "src/model/car";
import userModel from "src/model/user";
import { sendErrorRes } from "src/utils/helper";

export const createCarDetails: RequestHandler = async (req, res) => {
  const { make, year, VIN, model } = req.body;
  const user = await userModel.findById(req.user.id);
  if (!user) return sendErrorRes(res, "Unauthorize access", 401);
  const car = await CarModel.create({
    make,
    year,
    VIN,
    model,
    owner: req.user.id,
  });
  res.json({ success: true, message: "Car created successfully", data: car });
};

export const getCarDetails: RequestHandler = async (req, res) => {
  const cars = await CarModel.find({ owner: req.user.id });
  if (!cars)
    return sendErrorRes(res, "unauthorize request, no car found!", 401);
  res.json({ success: true, data: cars });
};

export const updateCarDetails: RequestHandler = async (req, res) => {
  const { carId } = req.params;
  const { make, model, year, VIN } = req.body;
  const user = await CarModel.findOne({ owner: req.user.id });
  if (!user)
    return sendErrorRes(res, "unauthorize requst, no car record found!", 403);
  const car = await CarModel.findByIdAndUpdate(carId, {
    make,
    model,
    year,
    VIN,
  });
  if (!car)
    return sendErrorRes(res, "unauthorize requst, no car record found!", 403);
  res.json({ message: "car details updates successfully!", success: true });
};
