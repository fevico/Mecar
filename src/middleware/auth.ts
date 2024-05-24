import { RequestHandler } from "express";
import userModel from "src/model/carOwner";
import { sendErrorRes } from "src/utils/helper";
import jwt from 'jsonwebtoken'
import mechanicModel from "src/model/mechanic";

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    verified: boolean;
}

 declare global {
    namespace Express{
        interface Request{
            user: UserProfile
        }
    }
}

export const isAuth: RequestHandler = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return sendErrorRes(res, 'Unauthorized request!', 403);
    }
  
    const token = authToken.split('Bearer ')[1];
    if (!token) {
      return sendErrorRes(res, 'Unauthorized request!', 403);
    }
  
    try {
      const payload = jwt.verify(token, 'secret') as { id: string };
      let user = await userModel.findById(payload.id);
      if (!user) {
        user = await mechanicModel.findById(payload.id);
      }
  
      if (!user) {
        return sendErrorRes(res, 'Unauthorized request!', 403);
      }
  
      req.user = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        verified: user.verified,
      };
  
      next();
    } catch (err) {
      console.error('Error during token verification or user lookup:', err);
      return sendErrorRes(res, 'Unauthorized request!', 403);
    }
  };