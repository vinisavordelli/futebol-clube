import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/Team';

export default class Team {
  static async getAll(_req:Request, res: Response, _next: NextFunction) {
    try {
      const result = await TeamService.getAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(req:Request, res: Response, _next: NextFunction) {
    try {
      const result = await TeamService.getById(req.params.id);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
