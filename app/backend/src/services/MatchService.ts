import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';
import 'express-async-errors';

export interface ParamsMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

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

  public static async finishedMatch(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }

  public static async updatedMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const successfulMessage = 'Match updated successfully';

    return successfulMessage;
  }

  public static async createNewMatch(param: ParamsMatch) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = param;
    await TeamService.findById(homeTeamId);
    await TeamService.findById(awayTeamId);

    const newMatch = await MatchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return newMatch;
  }
}
