import { Request } from 'express';
import User from '../Authentication/user.interface';
 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;