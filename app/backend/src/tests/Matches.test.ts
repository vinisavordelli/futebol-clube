import * as sinon from 'sinon';
import * as chai from 'chai';
import {before, after} from 'mocha';
import { tokenAuth } from './mocks/users';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { matchCreate, matchInProgressFalse, matchInProgressTrue, matchFindAll, matchesInDB } from './mocks/matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('ENDPOINT /matches (GET)', () => {
  let response: Response;
  
  describe('Requisição OK -> All matches', () => {
    before(async () => {
      sinon.stub(Match, "findAll").resolves(matchFindAll as unknown as Match[]);
    })
    
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array com todos os matches', async () => {
      response = await chai.request(app).get('/matches');
      expect(response.body).to.deep.equal(matchFindAll);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Requisição OK -> inProgress false matches', () => {
    before(async () => {
      sinon.stub(Match, "findAll").resolves(matchInProgressFalse as unknown as Match[]);
    })
    
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array com todos os matches com inProgress igual a false', async () => {
      response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.body).to.deep.equal(matchInProgressFalse);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body[0].inProgress).to.be.equal(false);
      expect(response.body[1].inProgress).to.be.equal(false);
      expect(response.body[2].inProgress).to.be.equal(false);
    });
  });

  describe('Requisição OK -> inProgress true matches', () => {
    before(async () => {
      sinon.stub(Match, "findAll").resolves(matchInProgressTrue as unknown as Match[]);
    })
    
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um array com todos os matches com inProgress igual a true', async () => {
      response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.body).to.deep.equal(matchInProgressTrue);
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body[0].inProgress).to.be.equal(true);
      expect(response.body[1].inProgress).to.be.equal(true);
      expect(response.body[2].inProgress).to.be.equal(true);
    });
  });
});

describe('ENDPOINT /matches (POST)', () => {
  let response: Response;
  let requestBody = {};
  const authorization = tokenAuth;

  describe('Requisição é feita com sucesso', () => {
    before(async () => {
      sinon.stub(Match, "create").resolves(matchCreate as unknown as Match);
    })
    
    after(async () => {
      (Match.create as sinon.SinonStub).restore();
    })

    requestBody = {
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    }

    it('Retorna um objeto da nova partida', async () => {
      response = await chai.request(app).post('/matches').send(requestBody).set('Authorization', authorization);
      expect(response.body).to.deep.equal(matchesInDB[matchesInDB.length - 1]);
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(201);
    });
  });

  describe('Requisição feita com dois times iguais', () => {
    const requestBodyEqualTeams = {
      homeTeam: 8,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    }

    it('Retorna uma mensagem de erro e status 401', async () => {
      response = await chai.request(app).post('/matches').send(requestBodyEqualTeams).set('Authorization', authorization);
      expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      expect(response.status).to.be.equal(401);
    });
  });

  describe('Requisição feita com time inexistente', () => {
    const requestBodyInvalidTeam = {
      homeTeam: 8,
      awayTeam: 79,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    }

    it('Retorna uma mensagem de erro e status 401', async () => {
      response = await chai.request(app).post('/matches').send(requestBodyInvalidTeam).set('Authorization', authorization);
      expect(response.body).to.deep.equal({ message: 'There is no team with such id!'});
      expect(response.status).to.be.equal(404);
    });
  });
});

type numberUpdate = Array<number> | any;

describe('ENDPOINT /matches/:id/finish (PATCH)', () => {
  let response: Response;
  const authorization = tokenAuth;

  describe('Requisição feita com sucesso', () => {
    before(async () => {
      sinon.stub(Match, "update").resolves();
    })
    
    after(async () => {
      (Match.update as sinon.SinonStub).restore();
    })

    it('Caso a partida não esteja finalizada: Retorna [1] e status 200', async () => {
      response = await chai.request(app).patch('/matches/41/finish').set('Authorization', authorization);
      expect(response.body).to.deep.equal({message: 'Finished'});
      expect(response.status).to.be.equal(200);
    });
  });
});

describe('ENDPOINT /matches/:id (PATCH)', () => {
  let response: Response;
  const authorization = tokenAuth;

  describe('Requisição feita com sucesso', () => {
    before(async () => {
      sinon.stub(Match, "update").resolves();
    })
    
    after(async () => {
      (Match.update as sinon.SinonStub).restore();
    })

    let requestBodyUpdate = {
      homeTeamGoals: 3,
      awayTeamGoals: 1,
    }

    it('Caso a partida não esteja finalizada: Retorna [1] e status 200', async () => {
      response = await chai.request(app).patch('/matches/41').send(requestBodyUpdate).set('Authorization', authorization);
      expect(response.body).to.deep.equal({message: 'Updated'});
      expect(response.status).to.be.equal(200);
    });
  });
});