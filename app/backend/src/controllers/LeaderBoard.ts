import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import BoardService from '../services/LeaderBoard';

export default class Board {
  static async getAll(req:Request, res: Response, _next: NextFunction) {
    try {
      const { originalUrl } = req;
      const result = await BoardService.getAll(originalUrl);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
