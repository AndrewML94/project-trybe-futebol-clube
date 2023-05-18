import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.getAllMatches);
MatchRouter.patch('/:id/finish', TokenMiddleware.validateToken, MatchController.finishedMatch);
MatchRouter.patch('/:id', TokenMiddleware.validateToken, MatchController.updatedMatch);
MatchRouter.post('/', TokenMiddleware.validateToken, MatchController.createNewMatch);

export default MatchRouter;
