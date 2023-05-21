import LeaderboardHomeCalc from '../utils/LeaderboardHomeCalc';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import LeaderboardAwayCalc from '../utils/LeaderboardAwayCalc';

export default class LeaderboardService {
  public static async getAllLeaderboardHome() {
    const teams = await TeamModel.findAll();
    const matches = await MatchModel.findAll({ where: { inProgress: false } });
    return LeaderboardHomeCalc.leaderboardHomeCreated(matches, teams);
  }

  public static async getAllLeaderboardAway() {
    const teams = await TeamModel.findAll();
    const matches = await MatchModel.findAll({ where: { inProgress: false } });
    return LeaderboardAwayCalc.leaderboardAwayCreated(matches, teams);
  }
}
