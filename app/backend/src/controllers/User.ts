import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from 'src/services/User';
import ILogin from '../interfaces/ILogin';