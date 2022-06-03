import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
  teamHome?: {
    teamName: string,
  };

  teamAway?: {
    teamName: string,
  };
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: DataTypes.INTEGER,

  homeTeamGoals: DataTypes.INTEGER,

  awayTeam: DataTypes.INTEGER,

  awayTeamGoals: DataTypes.INTEGER,

  inProgress: DataTypes.INTEGER,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false });
