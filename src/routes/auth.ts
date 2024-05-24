import { Router } from "express";
import { create } from "src/controllers/auth";

const authRouter = Router()
authRouter.post('/sign-in', create)

export default authRouter;