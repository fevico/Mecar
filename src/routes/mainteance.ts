import { Router } from "express";
import { createMaintenance } from "src/controllers/maintenance";
import { isAuth } from "src/middleware/auth";

const maintenaceRouter = Router()

maintenaceRouter.post('/create', isAuth, createMaintenance)

export default maintenaceRouter