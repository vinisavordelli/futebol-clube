import { IMatch } from '../interfaces/IMatch';

const IStats = {
  name: '',
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  totalPoints: 0,
  efficiency: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const calculateTotals = (matches: IMatch[], name: string) => {
  const stats = { ...IStats };
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      stats.totalVictories += 1;
      stats.totalPoints += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      stats.totalDraws += 1; stats.totalPoints += 1;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) { stats.totalLosses += 1; }
    stats.goalsFavor += match.homeTeamGoals;
    stats.goalsOwn += match.awayTeamGoals;
    stats.name = name;
  });
  stats.totalGames = matches.length;
  stats.efficiency = (stats.totalVictories * 3 + stats.totalDraws)
   / (((stats.totalVictories + stats.totalDraws + stats.totalLosses) * 3) * 100);
  return stats;
};

export default calculateTotals;
