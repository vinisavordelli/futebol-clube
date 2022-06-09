import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const router = Router();

router.get('/b', LeaderBoardController.getAll);

export default router;
