import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Users extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});
