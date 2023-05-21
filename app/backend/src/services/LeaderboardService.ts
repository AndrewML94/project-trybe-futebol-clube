import LeaderboardHomeCalc from '../utils/LeaderboardHomeCalc';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class LeaderboardService {
  public static async getAllLeaderboardHome() {
    const teams = await TeamModel.findAll();
    const matches = await MatchModel.findAll({ where: { inProgress: false } });
    return LeaderboardHomeCalc.leaderboardHomeCreated(matches, teams);
  }
}
