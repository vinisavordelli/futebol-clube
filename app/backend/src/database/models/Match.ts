import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamModel from './Team';

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
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false });

TeamModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
