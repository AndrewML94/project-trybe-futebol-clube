import { TeamAttributes } from '../database/models/TeamModel';
import { ParamsMatch } from '../services/MatchService';
import LeaderboardAwayCalc from './LeaderboardAwayCalc';
import LeaderboardHomeCalc from './LeaderboardHomeCalc';

export interface Leaderboard {
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

export interface P {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface InformationL {
  playHome: ParamsMatch[],
  playAway: ParamsMatch[],
  goalsFavor: number,
  goalsOwn: number,
  teamN: string,
}

export default class LeaderboardCalc {
  public static leaderboard(matches: ParamsMatch[], team: TeamAttributes) {
    const playHome = matches.filter((match) => match.homeTeamId === team.id);
    const playAway = matches.filter((match) => match.awayTeamId === team.id);
    const goalsFavor = playHome.reduce((acc, cur) => acc + cur.homeTeamGoals, 0) + playAway
      .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const goalsOwn = playHome.reduce((acc, cur) => acc + cur.awayTeamGoals, 0) + playAway
      .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const teamN = team.teamName;

    return this.formLeaderboard({ playHome, playAway, goalsFavor, goalsOwn, teamN });
  }

  public static formLeaderboard(params: InformationL) {
    const { playHome, playAway, goalsFavor, goalsOwn, teamN } = params;
    return {
      name: teamN,
      totalPoints: this.totalPoints(playHome, playAway),
      totalGames: +(playHome.filter((elem: P) => elem).length + playAway
        .filter((elem: P) => elem).length),
      totalVictories: +(playHome.filter((elem: P) => elem.homeTeamGoals > elem.awayTeamGoals)
        .length + playAway.filter((elem: P) => elem.awayTeamGoals > elem.homeTeamGoals).length),
      totalDraws: +(playHome.filter((elem: P) => elem.homeTeamGoals === elem.awayTeamGoals)
        .length + playAway.filter((elem: P) => elem.awayTeamGoals === elem.homeTeamGoals).length),
      totalLosses: +(playHome.filter((elem: P) => elem.homeTeamGoals < elem.awayTeamGoals)
        .length + playAway.filter((elem: P) => elem.awayTeamGoals < elem.homeTeamGoals).length),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: +((this.totalPoints(playHome, playAway)
        / ((playHome.length + playAway.length) * 3)) * 100).toFixed(2),
    };
  }

  public static totalPoints(playHome: ParamsMatch[], playAway: ParamsMatch[]) {
    const homePoints = LeaderboardHomeCalc.totalPoints(playHome);
    const awayPoints = LeaderboardAwayCalc.totalPoints(playAway);
    const totalOfPoints = homePoints + awayPoints;

    return totalOfPoints;
  }

  public static dataOrdering(data: Leaderboard[]) {
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

  public static leaderboardCreated(matches: ParamsMatch[], teams: TeamAttributes[]) {
    const allTeamsResult = teams.map((team) => this.leaderboard(matches, team));
    const dataTeamsOrd = this.dataOrdering(allTeamsResult);
    return dataTeamsOrd;
  }
}
