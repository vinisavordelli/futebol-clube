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
}
