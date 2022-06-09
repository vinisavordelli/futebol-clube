import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import BoardService from '../services/LeaderBoard';

export default class Board {
  static async getAll(_req:Request, res: Response, _next: NextFunction) {
    try {
      const result = await BoardService.getAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
