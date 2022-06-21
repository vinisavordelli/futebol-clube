import * as sinon from 'sinon';
import * as chai from 'chai';
import {before, after} from 'mocha';
import { tokenAuth } from './mocks/users';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import Teams from '../database/models/Team';
import { matchInProgressFalse } from './mocks/matches';
import {leaderboardAll, leaderboardAway, leaderboardHome} from './mocks/leaderBoard'
import { Response } from 'superagent';
import {teamsGetAllMock} from './mocks/teams'

chai.use(chaiHttp);

const { expect } = chai;

describe('ENDPOINT /leaderboard (GET)', () => {
  let response: Response;

  describe('Requisição feita com sucesso', () => {
    before(async () => {
      sinon.stub(Teams, "findAll").resolves(teamsGetAllMock as unknown as Teams[]);
      sinon.stub(Match, "findAll").resolves(matchInProgressFalse as unknown as Match[]);
    })
    
    after(async () => {
      (Teams.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array de objetos com os dados de cada time', async () => {
      response = await chai.request(app).get('/leaderboard');
      expect(response.body).to.deep.equal(leaderboardAll);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    });
  });
});

describe('ENDPOINT /leaderboard/home (GET)', () => {
  let response: Response;

  describe('Requisição feita com sucesso', () => {
    before(async () => {
      sinon.stub(Teams, "findAll").resolves(teamsGetAllMock as unknown as Teams[]);
      sinon.stub(Match, "findAll").resolves(matchInProgressFalse as unknown as Match[]);
    })
    
    after(async () => {
      (Teams.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array de objetos com os dados de cada time da casa', async () => {
      response = await chai.request(app).get('/leaderboard/home');
      expect(response.body).to.deep.equal(leaderboardHome);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    });
  });
});

describe('ENDPOINT /leaderboard/away (GET)', () => {
  let response: Response;

  describe('Requisição feita com sucesso', () => {
    before(async () => {
      sinon.stub(Teams, "findAll").resolves(teamsGetAllMock as unknown as Teams[]);
      sinon.stub(Match, "findAll").resolves(matchInProgressFalse as unknown as Match[]);
    })
    
    after(async () => {
      (Teams.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array de objetos com os dados de cada time convidado', async () => {
      response = await chai.request(app).get('/leaderboard/away');
      expect(response.body).to.deep.equal(leaderboardAway);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    });
  });
});