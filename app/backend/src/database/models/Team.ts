import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false });
