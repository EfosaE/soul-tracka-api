import { Router } from 'express';
import { login, signUp } from '../controllers/authController';
import { getAllUsers } from '../controllers/userController';

const userRouter = Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/').get(getAllUsers);
export default userRouter;
