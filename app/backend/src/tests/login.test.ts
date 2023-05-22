import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonWebToken from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { correctUser, incorrectUser } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /login:', function () {
  afterEach(()=>{
    sinon.restore()
  })

  it('Ao utilizar POST na rota, ao inserir o email incorreto, verifica se é apresentado um erro;', async function () {
    sinon.stub(UserModel, 'findOne').resolves(incorrectUser as unknown as UserModel);

    const response = await chai.request(app).post('/login').send(incorrectUser);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Ao utilizar POST na rota, ao inserir o email faltando a senha, verifica se é apresentado um erro;', async function () {
    sinon.stub(UserModel, 'findOne').resolves(incorrectUser as unknown as UserModel);

    const response = await chai.request(app).post('/login').send(incorrectUser.email);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Ao utilizar POST na rota, ao inserir a senha faltando o email, verifica se é apresentado um erro;', async function () {
    sinon.stub(UserModel, 'findOne').resolves(incorrectUser as unknown as UserModel);

    const response = await chai.request(app).post('/login').send(incorrectUser.password);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Ao utilizar POST na rota, verifica se ao inserir o email e senha corretas, é retornado o token'), async function () {
    sinon.stub(UserModel, 'findOne').resolves(correctUser as unknown as UserModel);
    const response = await chai.request(app).post('/login').send(correctUser);

    expect(response.status).to.be.equal(200);
    expect(response.body.token).to.be.an('string');
  }
});