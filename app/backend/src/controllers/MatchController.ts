import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      if (inProgress === 'true') {
        return res.status(200).json(await MatchService.getProgress(true));
      }
      if (inProgress === 'false') {
        return res.status(200).json(await MatchService.getProgress(false));
      }
    }

    return res.status(200).json(await MatchService.getAllMatches());
  }
}
