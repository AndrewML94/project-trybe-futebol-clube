import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static async findAll(_req: Request, res: Response) {
    const allTeams = await TeamService.findAll();

    res.status(200).json(allTeams);
  }

  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findById(+id);

    res.status(200).json(team);
  }
}
