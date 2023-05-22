import { TeamAttributes } from '../database/models/TeamModel';
import { ParamsMatch } from '../services/MatchService';

export interface LeaderboardA {
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

export default class LeaderboardAwayCalc {
  public static leaderboardAway(matches: ParamsMatch[], team: TeamAttributes) {
    const playAway = matches.filter((match) => match.awayTeamId === team.id);
    const goalsFavor = playAway.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const goalsOwn = playAway.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const totalPoints = this.totalPoints(playAway);

    return {
      name: team.teamName,
      totalPoints,
      totalGames: playAway.filter((elem) => elem).length,
      totalVictories: playAway.filter((elem) => elem.awayTeamGoals > elem.homeTeamGoals).length,
      totalDraws: playAway.filter((elem) => elem.awayTeamGoals === elem.homeTeamGoals).length,
      totalLosses: playAway.filter((elem) => elem.awayTeamGoals < elem.homeTeamGoals).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: +((totalPoints / (playAway.length * 3)) * 100).toFixed(2),
    };
  }

  public static totalPoints(matches: ParamsMatch[]) {
    return matches.reduce((acc, cur) => {
      if (cur.awayTeamGoals > cur.homeTeamGoals) {
        return acc + 3;
      }
      if (cur.awayTeamGoals === cur.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static dataOrdering(data: LeaderboardA[]) {
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

  public static leaderboardAwayCreated(matches: ParamsMatch[], teams: TeamAttributes[]) {
    const homeTeams = teams.map((team) => this.leaderboardAway(matches, team));
    const dataTeamsOrd = this.dataOrdering(homeTeams);
    return dataTeamsOrd;
  }
}
