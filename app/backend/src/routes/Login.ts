import { Router } from 'express';
import UserController from '../controllers/User';

const router = Router();

router.post('/login', UserController.login);

export default router;
