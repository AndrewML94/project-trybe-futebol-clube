import { TeamAttributes } from '../database/models/TeamModel';
import { ParamsMatch } from '../services/MatchService';

export interface LeaderboardH {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class LeaderboardHomeCalc {
  public static leaderboardHome(matches: ParamsMatch[], team: TeamAttributes) {
    const playHome = matches.filter((match) => match.homeTeamId === team.id);
    const goalsFavor = playHome.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const goalsOwn = playHome.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const totalPoints = this.totalPoints(playHome);

    return {
      name: team.teamName,
      totalPoints,
      totalGames: playHome.filter((elem) => elem).length,
      totalVictories: playHome.filter((elem) => elem.homeTeamGoals > elem.awayTeamGoals).length,
      totalDraws: playHome.filter((elem) => elem.homeTeamGoals === elem.awayTeamGoals).length,
      totalLosses: playHome.filter((elem) => elem.homeTeamGoals < elem.awayTeamGoals).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: +((totalPoints / (playHome.length * 3)) * 100).toFixed(2),
    };
  }

  public static totalPoints(matches: ParamsMatch[]) {
    return matches.reduce((acc, cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 3;
      }
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static dataOrdering(data: LeaderboardH[]) {
    return data.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 0;
    });
  }

  public static leaderboardHomeCreated(matches: ParamsMatch[], teams: TeamAttributes[]) {
    const homeTeams = teams.map((team) => this.leaderboardHome(matches, team));
    const dataTeamsOrd = this.dataOrdering(homeTeams);
    return dataTeamsOrd;
  }
}
