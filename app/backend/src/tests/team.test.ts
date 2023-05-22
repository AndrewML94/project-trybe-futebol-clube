import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel, { TeamAttributes } from '../database/models/TeamModel';
import { allTeams, team } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /teams', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, o array de objetos contendo os times é retornado', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(allTeams  as TeamModel[]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });

  it('Ao utilizar GET na rota, o array de objetos contendo os times é retornado', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(null as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no registered team' });
  });
});

describe('Teste da rota /teams/id', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, informando um id válido, é retornado um time', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(team  as TeamModel);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(team);
  });

  it('Ao utilizar GET na rota, informando um id inválido, é retornado um erro', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });
});
