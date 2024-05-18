import { Router } from "express";
import { create } from "src/controllers/auth";

const authRouter = Router()
authRouter.post('/create', create)

export default authRouter;