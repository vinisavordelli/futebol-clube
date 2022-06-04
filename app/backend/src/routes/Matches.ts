import { Router } from 'express';
import MatchController from '../controllers/Match';

const router = Router();

router.get('/Matches', MatchController.getAll)
  .get('/Matches/:id', MatchController.getById)
  .post('/Matches', MatchController.create);

export default router;
