import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Match';
import calculateTotals from '../helpers/LeaderBoardFunctions';

export default class LeaderBoard {
  static async getAll(url: string) {
    const teams = await Team.findAll() as unknown as ITeam[];
    const matches = await teams.map(async (team) => {
      const homeM = await Matches.findAll({ where: { homeTeam: team.id, inProgress: false } });
      const awayM = await Matches.findAll({ where: { awayTeam: team.id, inProgress: false } });
      if (url === '/leaderboard/home') {
        return calculateTotals(homeM, [], team.teamName);
      }
      if (url === '/leaderboard/away') {
        return calculateTotals([], awayM, team.teamName);
      }
      return calculateTotals(homeM, awayM, team.teamName);
    });
    return Promise.all(matches);
  }
}
