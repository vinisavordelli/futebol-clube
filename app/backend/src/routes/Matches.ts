import { Router } from 'express';
import MatchController from '../controllers/Match';

const router = Router();

router.get('/Matches', MatchController.getAll)
  .get('/Matches/:id', MatchController.getById);

export default router;
