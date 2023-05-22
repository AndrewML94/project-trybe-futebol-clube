import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonWebToken from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { allMatches, matchError, newMatch, onlyProgressFalse, onlyProgressTrue } from './mocks/match.mock';
import { payload, token } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar GET na rota, o array de objetos contendo os jogos é retornado;', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(allMatches as unknown  as MatchModel[]);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allMatches);
  });

  it('Ao utilizar GET na rota, com o progresso como true o array de objetos contendo os jogos é retornado;', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(onlyProgressTrue as unknown  as MatchModel[]);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(onlyProgressTrue);
  });

  it('Ao utilizar GET na rota, com o progresso como false o array de objetos contendo os jogos é retornado;', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(onlyProgressFalse as unknown  as MatchModel[]);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(onlyProgressFalse);
  });

  it('Ao utilizar POST na rota, com id\'s de time da casa e time de fora iguais, é apresentado erro;', async function () {
    sinon.stub(MatchModel, 'create').resolves(matchError as MatchModel);
    sinon.stub(jsonWebToken, 'verify').resolves(payload);

    const response = await chai.request(app).post('/matches').set({ "Authorization": token });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Ao utilizar POST na rota, com id\'s de time da casa e time de fora diferentes, é cadastrado um novo jogo;', async function () {
    sinon.stub(MatchModel, 'create').resolves(newMatch as MatchModel);
    sinon.stub(jsonWebToken, 'verify').resolves(payload);

    const response = await chai.request(app).post('/matches').set({ "Authorization": token }).send(newMatch);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newMatch);
  });

  it('Ao utilizar POST na rota, sem autorização para criação de jogos, é apresentado um erro;', async function () {
    sinon.stub(MatchModel, 'create').resolves(newMatch as MatchModel);

    const response = await chai.request(app).post('/matches').send(newMatch);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });
});

describe('Teste da rota /matches/id:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar PATCH na rota, informando um id válido, é atualizado os gols da partida;', async function () {
    sinon.stub(MatchModel, 'update').resolves([3]);
    sinon.stub(jsonWebToken, 'verify').resolves(payload);

    const response = await chai.request(app).patch('/matches/3').set({ "Authorization": token }).send({ homeTeamGoals: 5, awayTeamGoals: 3 });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Match updated successfully' });
  });
})

describe('Teste da rota /matches/id/finish:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar PATCH na rota, informando um id válido, é terminada uma partida;', async function () {
    sinon.stub(MatchModel, 'update').resolves([3]);
    sinon.stub(jsonWebToken, 'verify').resolves(payload);

    const response = await chai.request(app).patch('/matches/3/finish').set({ "Authorization": token });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });
})