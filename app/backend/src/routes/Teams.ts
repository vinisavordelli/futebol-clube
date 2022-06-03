import { Router } from 'express';
import TeamController from '../controllers/Team';

const router = Router();

router.get('/teams', TeamController.getAll)
  .get('/teams/:id', TeamController.getById);

export default router;
