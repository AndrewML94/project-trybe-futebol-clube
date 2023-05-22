import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allLeaderboard, allLeaderboardAway, allLeaderboardHome } from './mocks/leaderboard.mock';
import LeaderboardCalc, { Leaderboard } from '../utils/LeaderboardCalc';
import LeaderboardHomeCalc, { LeaderboardH } from '../utils/LeaderboardHomeCalc';
import LeaderboardAwayCalc, { LeaderboardA } from '../utils/LeaderboardAwayCalc';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /leaderboard:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, o array de objetos contendo os resultados dos jogos é apresentado;', async function () {
    sinon.stub(LeaderboardCalc, 'leaderboardCreated').resolves(allLeaderboard as unknown as Leaderboard[]);

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allLeaderboard);
  });
});

describe('Teste da rota /leaderboard/away:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, o array de objetos contendo os resultados dos jogos é apresentado;', async function () {
    sinon.stub(LeaderboardAwayCalc, 'leaderboardAwayCreated').resolves(allLeaderboardAway as unknown as LeaderboardA[]);

    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allLeaderboardAway);
  });
});

describe('Teste da rota /leaderboard/home:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, o array de objetos contendo os resultados dos jogos é apresentado;', async function () {
    sinon.stub(LeaderboardHomeCalc, 'leaderboardHomeCreated').resolves(allLeaderboardHome as unknown as LeaderboardH[]);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allLeaderboardHome);
  });
});
