import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Matches extends Model {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
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
