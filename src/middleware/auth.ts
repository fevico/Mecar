import { RequestHandler } from "express";
import userModel from "src/model/user";
import { sendErrorRes } from "src/utils/helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verified: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: UserProfile;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return sendErrorRes(res, "unauthorized request!", 403);
    const token = authToken.split("Bearer ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await userModel.findById(payload.id);
    if (!user) return sendErrorRes(res, "unauthorized request!", 403);
    req.user = {
      id: user._id!.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    next();
  } catch (error) {
    if(error instanceof TokenExpiredError){
        return sendErrorRes(res, "Session expired!", 401)
    }

    if(error instanceof JsonWebTokenError){
        return sendErrorRes(res, "unauthorized access!", 401)
    }
    next(error)
  }
};

export const isMechanic: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      return sendErrorRes(res, "You are not authorized to access this route!", 403);
    }

    if (req.user.role !== "mechanic") {
      return sendErrorRes(res, "unauthorized request!", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

