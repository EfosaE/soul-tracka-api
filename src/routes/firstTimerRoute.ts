import { Router } from 'express';
import { getAllFirstTimers } from '../controllers/firstTimerController';


const firstTimerRouter = Router();

firstTimerRouter.route('/').get(getAllFirstTimers)
export default firstTimerRouter;
