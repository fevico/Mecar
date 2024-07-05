import { RequestHandler } from "express";
import maintenanceModel from "src/model/maintenance";

export const createMaintenance: RequestHandler = async (req, res) => {
  const {location, maintenaceDate, maintenaceTime, carType, maintenaceType, maintenaceDescription} = req.body
  const carOwner = req.user.id
  const maintenance = await new maintenanceModel({
    location,
    carType,
    maintenaceDate,
    maintenaceTime,
    maintenaceType,
    maintenaceDescription,
    carOwner: carOwner
  })
  await maintenance.save()
  res.status(201).json({message: "Maintenance created successfully", maintenance})
};