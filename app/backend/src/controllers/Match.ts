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
      if (result === 401) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      if (result === 404) {
        return res.status(404).json(
          { message: 'There is no team with such id!' },
        );
      }
      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async finishMatch(req:Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await MatchService.finishMatch(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateMatch(req: Request, res:Response, _next:NextFunction) {
    try {
      const { id } = req.params;
      const {
        homeTeamGoals,
        awayTeamGoals,
      } = req.body;

      const response = await MatchService.updateMatch(homeTeamGoals, awayTeamGoals, Number(id));

      return res.status(StatusCodes.OK).json({ message: response });
    } catch (error) {
      console.log(error);
    }
  }
}
