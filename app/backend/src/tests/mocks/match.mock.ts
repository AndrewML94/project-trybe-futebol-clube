export const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
  {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Napoli-SC"
    },
    awayTeam: {
      teamName: "Minas Brasília"
    }
  },
];

export const onlyProgressTrue =   {
  id: 43,
  homeTeamId: 11,
  homeTeamGoals: 0,
  awayTeamId: 10,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "Napoli-SC"
  },
  awayTeam: {
    teamName: "Minas Brasília"
  }
}

export const onlyProgressFalse = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
];

export const matchError = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: 7,
  awayTeamGoals: 5,
  inProgress: true,
}

export const newMatch = {
  homeTeamId: 2,
  awayTeamId: 1,
  homeTeamGoals: 7,
  awayTeamGoals: 5,
  inProgress: true,
}