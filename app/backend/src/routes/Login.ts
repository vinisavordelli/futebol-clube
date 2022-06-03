import { Router } from 'express';
import UserController from '../controllers/User';

const router = Router();

router.post('/login', UserController.login)
  .get('/login/validate', UserController.validate);

export default router;
