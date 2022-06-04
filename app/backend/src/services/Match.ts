import IError from 'src/interfaces/IError';
import { StatusCodes } from 'http-status-codes';
import { IMatch, ITeamsMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

export default class Match {
  static async getAll(): Promise<ITeamsMatch[] | undefined> {
    try {
      const result = await MatchModel.findAll({
        include: [{
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'],
          } },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'],
          } },
        ],
      }) as ITeamsMatch[];

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterByProgress(progress:boolean):Promise<ITeamsMatch[] | undefined> {
    const inProgress = progress === true ? 1 : 0;
    const result = await MatchModel.findAll({
      where: { inProgress },
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
    }) as ITeamsMatch[];

    return result;
  }

  static async getById(id: number | string) {
    try {
      const result = await MatchModel.findByPk(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async create(match: IMatch): Promise<ITeamsMatch | IError | string> {
    if (match.awayTeam === match.homeTeam) {
      return { status: StatusCodes.UNAUTHORIZED,
        err: 'Teams cannot be the same' };
    }
    try {
      const checkTeams = await Promise.all([
        await TeamModel.findByPk(match.awayTeam),
        await TeamModel.findByPk(match.homeTeam),
      ]);
      if (checkTeams.some((team) => team === null)) {
        return {
          status: StatusCodes.NOT_FOUND,
          err: 'There is no team with such id!' };
      }
      const newMatch = await MatchModel.create(match);
      return newMatch;
    } catch (err) { console.log(err); }
  }
}
