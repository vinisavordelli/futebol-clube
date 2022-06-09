import TeamModel from '../database/models/Team';

export default class Team {
  static async getAll() {
    const result = await TeamModel.findAll();
    return result;
  }

  static async getById(id: number | string) {
    const result = await TeamModel.findByPk(id);
    return result;
  }
}
