import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import {before, after} from 'mocha';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { userFindOneMock, tokenAuth } from './mocks/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('ENDPOINT /login (POST)', () => {
  let response: Response;
  let bodyRequest;

  describe('Requisição feita com sucesso com usuário válido', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(userFindOneMock as User);
      sinon.stub(bcryptjs, "compare").resolves(true);
    })
    
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    })

    it('Retorna os dados do usuário', async () => {
      bodyRequest = { email: "admin@admin.com", password: "secret_admin" };
      response = await chai.request(app).post('/login').send(bodyRequest);
      const { user, token } = response.body;

      expect(user.id).to.be.equal(1);
      expect(user.username).to.be.equal("Admin");
      expect(user.role).to.be.equal("admin");
      expect(user.email).to.be.equal("admin@admin.com");
      expect(token).to.be.contains("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Requisição feita com usuário inválido', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(userFindOneMock as User);
      sinon.stub(bcryptjs, "compare").resolves(false);
    })
    
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    })

    it('Email do usuário incorreto', async () => {
      bodyRequest = { email: "trybe@trybe.com", password: "secret_admin" };
      response = await chai.request(app).post('/login').send(bodyRequest);
      const { message } = response.body;

      expect(response.status).to.be.equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });

    it('Password do usuário incorreto', async () => {
      bodyRequest = { email: "admin@admin.com", password: "admin" };
      response = await chai.request(app).post('/login').send(bodyRequest);
      const { message } = response.body;

      expect(response.status).to.be.equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });
  })

  describe('Requisição feita com dados faltando', async () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(userFindOneMock as User);
    })
    
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Requisição sem o email', async () => {
      bodyRequest = { password: "secret_admin" };
      response = await chai.request(app).post('/login').send(bodyRequest);
      const { message } = response.body;

      expect(response.status).to.be.equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });

    it('Requisição sem o password', async () => {
      bodyRequest = { email: "trybe@trybe.com" };
      response = await chai.request(app).post('/login').send(bodyRequest);
      const { message } = response.body;

      expect(response.status).to.be.equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  });
});

describe('ENDPOINT /login/validate (GET)', () => {
  let response: Response;
  const authorization = tokenAuth;

  before(async () => {
    sinon.stub(User, "findOne").resolves(userFindOneMock as User);
  })
  
  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('O token é válido e retorna o role do usuário', async () => {
    response = await chai.request(app)
      .get('/login/validate').set('Authorization', authorization);
    expect(response.body).to.be.equal('admin');
    expect(response.status).to.be.equal(200);
  });
});
