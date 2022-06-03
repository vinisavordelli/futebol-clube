import TeamModel from '../database/models/Team';

export default class Team {
  static async getAll() {
    try {
      const result = await TeamModel.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id: number | string) {
    try {
      const result = await TeamModel.findByPk(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
