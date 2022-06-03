import { ITeamsMatch } from '../interfaces/IMatch';
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

  static async getById(id: number | string) {
    try {
      const result = await MatchModel.findByPk(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}