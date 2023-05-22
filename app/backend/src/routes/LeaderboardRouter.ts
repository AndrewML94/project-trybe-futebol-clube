import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderboardController.getAllLeaderboard);
leaderboardRouter.get('/home', LeaderboardController.getAllLeaderboardHome);
leaderboardRouter.get('/away', LeaderboardController.getAllLeaderboardAway);

export default leaderboardRouter;
