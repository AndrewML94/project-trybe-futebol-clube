import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  public static async getAllMatches() {
    const allMatches = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return allMatches;
  }

  public static async getProgress(inProgress: boolean) {
    const allMatches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return allMatches;
  }
}
