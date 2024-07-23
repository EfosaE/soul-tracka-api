import { Router } from 'express';
import { login, signUp } from '../controllers/authController';
import { getAllUsers } from '../controllers/userController';
import verifyPassword from '../middlewares/verifyPassword';
import validateJWT from '../middlewares/validateJWT';

const userRouter = Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(verifyPassword, login);
userRouter.route('/').get(validateJWT, getAllUsers);
export default userRouter;
