import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/Match';

export default class Match {
  static async getAll(_req:Request, res: Response, _next: NextFunction) {
    try {
      const result = await MatchService.getAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(req:Request, res: Response, _next: NextFunction) {
    try {
      const result = await MatchService.getById(req.params.id);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
