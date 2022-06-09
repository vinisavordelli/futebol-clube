import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Match';
import calculateTotals from '../helpers/LeaderBoardFunctions';

export default class LeaderBoard {
  static async getAll() {
    const arr: any = [];
    const teams = await Team.findAll() as unknown as ITeam[];
    const matches = await teams.map(async (team) => {
      const homeM = await Matches.findAll({ where: { homeTeam: team.id, inProgress: false } });
      const awayM = await Matches.findAll({ where: { awayTeam: team.id, inProgress: false } });
      const result = calculateTotals(homeM, team.teamName);
      return result;
    });
    return Promise.all(matches);
  }
}
