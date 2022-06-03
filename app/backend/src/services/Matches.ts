import MatchModel from '../database/models/Match';

export default class Match {
  static async getAll() {
    try {
      const result = await MatchModel.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id: number | string) {
    try {
      const result = await MatchModel.findByPk(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
