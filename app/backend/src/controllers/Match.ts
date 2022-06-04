import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/Match';

export default class Match {
  static async getAll(req:Request, res: Response, _next: NextFunction) {
    try {
      const { inProgress } = req.query;
      let result;
      if (inProgress) {
        result = await MatchService.filterByProgress(inProgress === 'true');
      }
      result = await MatchService.getAll();
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

  static async create(req:Request, res: Response, _next: NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const result = await MatchService.create(
        { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
      );
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
