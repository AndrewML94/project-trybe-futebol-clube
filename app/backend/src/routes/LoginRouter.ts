import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const LoginRouter = Router();

LoginRouter.post('/', LoginMiddleware.validateLogin, LoginController.verifyLogin);
LoginRouter.get('/role', TokenMiddleware.validateToken, LoginController.getRole);

export default LoginRouter;
