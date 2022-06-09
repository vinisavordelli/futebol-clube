import { IMatch, ITeamsMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

export default class Match {
  static async getAll(): Promise<ITeamsMatch[] | undefined> {
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
    const result = await MatchModel.findByPk(id);
    return result;
  }

  static async create(match: IMatch): Promise<IMatch | number | void> {
    if (match.awayTeam === match.homeTeam) return 401;
    const checkTeams = await Promise.all([
      await TeamModel.findByPk(match.awayTeam),
      await TeamModel.findByPk(match.homeTeam),
    ]);
    if (checkTeams.some((team) => team === null)) return 404;

    const newMatch = await MatchModel.create(match);
    return newMatch;
  }

  static async finishMatch(id: number | string): Promise<object> {
    await MatchModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  static async updateMatch(homeTeamGoals:number, awayTeamGoals:number, id:number): Promise<string> {
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated';
  }
}
