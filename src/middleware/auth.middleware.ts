import { NextFunction,Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from 'Authentication/user.model';
import RequestWithUser from 'interfaces/requestWithUser.interface';
 
async function authMiddleware(request:RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new Error("WrongAuthenticationTokenException"));
      }
    } catch (error) {
      next(new Error("WrongAuthenticationTokenException"));
    }
  } else {
    next(new Error("AuthenticationTokenMissingException"));
  }
}
 
export default authMiddleware;
