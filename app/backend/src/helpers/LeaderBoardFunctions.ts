export const calculateMatchPoints = (teamGoals:number, adversaryGoals:number):number => {
  if (teamGoals === adversaryGoals) return 1;
  if (teamGoals > adversaryGoals) return 3;
  return 0;
};

export const calculateMatchEfficiency = (totalPoints:number, totalGames:number):number => Number(
  ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
);
