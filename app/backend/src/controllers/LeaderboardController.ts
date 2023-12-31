import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getAllLeaderboardHome(_req: Request, res: Response) {
    return res.status(200).json(await LeaderboardService.getAllLeaderboardHome());
  }

  public static async getAllLeaderboardAway(_req: Request, res: Response) {
    return res.status(200).json(await LeaderboardService.getAllLeaderboardAway());
  }

  public static async getAllLeaderboard(_req: Request, res: Response) {
    return res.status(200).json(await LeaderboardService.getAllLeaderboard());
  }
}
