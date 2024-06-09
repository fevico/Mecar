import { Router } from "express";
import { createService } from "src/controllers/services";
import { isAuth, isMechanic } from "src/middleware/auth";

const serviceRouter = Router()

serviceRouter.post('/create', isAuth, isMechanic, createService)

export default serviceRouter