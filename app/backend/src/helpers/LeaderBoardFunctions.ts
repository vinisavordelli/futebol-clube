import ILeaderboard from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatch';

const IStats = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const calculateHome = (matches: IMatch[]) => {
  const stats = { ...IStats } as ILeaderboard;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      stats.totalVictories += 1; stats.totalPoints += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      stats.totalDraws += 1; stats.totalPoints += 1;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) { stats.totalLosses += 1; }
    stats.goalsFavor += match.homeTeamGoals; stats.goalsOwn += match.awayTeamGoals;
  });
  return stats;
};

const calculateAway = (matches: IMatch[]) => {
  const stats = { ...IStats } as ILeaderboard;
  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      stats.totalVictories += 1; stats.totalPoints += 3;
    }
    if (match.awayTeamGoals === match.homeTeamGoals) {
      stats.totalDraws += 1; stats.totalPoints += 1;
    }
    if (match.awayTeamGoals < match.homeTeamGoals) { stats.totalLosses += 1; }
    stats.goalsFavor += match.awayTeamGoals; stats.goalsOwn += match.homeTeamGoals;
  });
  return stats;
};

const buildStats = (homeStats: ILeaderboard, awayStats: ILeaderboard) => {
  const stats = { ...IStats } as ILeaderboard;
  stats.totalVictories = homeStats.totalVictories + awayStats.totalVictories;
  stats.totalDraws = homeStats.totalDraws + awayStats.totalDraws;
  stats.totalLosses = homeStats.totalLosses + awayStats.totalLosses;
  stats.totalPoints = homeStats.totalPoints + awayStats.totalPoints;
  stats.goalsFavor = homeStats.goalsFavor + awayStats.goalsFavor;
  stats.goalsOwn = homeStats.goalsOwn + awayStats.goalsOwn;
  stats.goalsBalance = stats.goalsFavor - stats.goalsOwn;
  return stats;
};

const calculateTotals = (homeMatches: IMatch[], awayMatches: IMatch[], name: string) => {
  const homeStats = calculateHome(homeMatches);
  const awayStats = calculateAway(awayMatches);
  const stats = buildStats(homeStats, awayStats);
  stats.name = name;
  stats.totalGames = (homeMatches.length + awayMatches.length);
  stats.efficiency = Number(((stats.totalPoints
   / (((stats.totalVictories + stats.totalDraws + stats.totalLosses) * 3))) * 100).toFixed(2));
  return stats as ILeaderboard;
};

export default calculateTotals;
