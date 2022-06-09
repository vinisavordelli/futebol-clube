import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import {before, after} from 'mocha';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { teamGetIdMock, teamsGetAllMock } from './mocks/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('ENDPOINT /teams (GET)', () => {
  let response: Response;
  
  describe('Requisição é feita com sucesso', () => {
    before(async () => {
      sinon.stub(Team, "findAll").resolves(teamsGetAllMock as unknown as Team[]);
    })
    
    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array com os Teams', async () => {
      response = await chai.request(app).get('/Teams');
      expect(response.body).to.deep.equal(teamsGetAllMock);
      expect(response.status).to.be.equal(200);
    });
  });
});

describe('ENDPOINT /Teams/:id (GET)', () => {
  let response: Response;
  
  describe('Requisição é feita com sucesso com o id "1"', () => {
    before(async () => {
      sinon.stub(Team, "findByPk").resolves(teamGetIdMock as unknown as Team);
    })
    
    after(async () => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Retorna um objeto com o Team', async () => {
      response = await chai.request(app).get('/Teams/1');
      expect(response.body).to.deep.equal(teamGetIdMock);
      expect(response.status).to.be.equal(200);
    });
  });
});
