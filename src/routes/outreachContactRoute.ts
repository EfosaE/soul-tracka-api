import { Router } from 'express';
import { createContact, deleteAll, getAllContacts } from '../controllers/outreachController';

const outreachRouter = Router();

outreachRouter.route('/').get(getAllContacts)
outreachRouter.route('/').post(createContact)
outreachRouter.route('/').delete(deleteAll);

export default outreachRouter;
