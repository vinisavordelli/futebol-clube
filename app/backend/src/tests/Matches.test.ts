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
