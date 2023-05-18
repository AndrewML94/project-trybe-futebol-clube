import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import { UnprocessableEntityError } from '../errors';

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

  public static async finishedMatch(req: Request, res: Response) {
    const { id } = req.params;

    await MatchService.finishedMatch(+id);

    return res.status(200).json({ message: 'Finished' });
  }

  public static async updatedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const returnUpdate = await MatchService.updatedMatch(+id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: returnUpdate });
  }

  public static async createNewMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const messageError = 'It is not possible to create a match with two equal teams';

    if (homeTeamId === awayTeamId) {
      throw new UnprocessableEntityError(messageError);
    }

    const objectInfo = {
      homeTeamId: +homeTeamId,
      awayTeamId: +awayTeamId,
      homeTeamGoals: +homeTeamGoals,
      awayTeamGoals: +awayTeamGoals,
      inProgress: true,
    };

    return res.status(201).json(await MatchService.createNewMatch(objectInfo));
  }
}
