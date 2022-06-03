import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User';

export default class UserController {
  static async login(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'All fields must be filled',
        });
      }
      const result = await UserService.Login({ email, password });

      if (!result) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Incorrect email or password',
        });
      }

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
