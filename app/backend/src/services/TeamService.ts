import NotFoundError from '../errors/NotFoundError';
import TeamModel, { TeamAttributes } from '../database/models/TeamModel';

export default class TeamService {
  public static async findAll(): Promise<TeamAttributes[]> {
    const allTeams = await TeamModel.findAll();

    if (!allTeams) throw new NotFoundError('There is no registered team');

    return allTeams.map((team) => team.toJSON());
  }

  public static async findById(id: number): Promise<TeamAttributes> {
    const team = await TeamModel.findByPk(id);

    if (!team) throw new NotFoundError('Team not found');

    return team.toJSON();
  }
}
