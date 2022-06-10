import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const router = Router();

router.get('/leaderboard', LeaderBoardController.getAll)
  .get('/leaderboard/home', LeaderBoardController.getAll)
  .get('/leaderboard/away', LeaderBoardController.getAll);

export default router;
