import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './Match';

export default class Teams extends Model {
  teamName!: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false });

Matches.belongsTo(Teams, { foreignKey: 'id', as: 'teams_home_team' });
Matches.belongsTo(Teams, { foreignKey: 'id', as: 'teams_away_team' });

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'matches_home_team' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'matches_away_team' });
