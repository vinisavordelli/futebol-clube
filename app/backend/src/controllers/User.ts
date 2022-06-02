import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User';

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await UserService.Login({ email, password });

      if (!result) {
        return next(({ type: 'UNAUTHORIZED', message: 'Incorrect email or password' }));
      }

      return res.status(StatusCodes.OK).json({ ...result });
    } catch (err) {
      console.log(err);
    }
  }
}
