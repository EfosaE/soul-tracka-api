import { Router } from 'express';
import { createContact, createManyContact, deleteAll, getAllContacts } from '../controllers/outreachController';

const outreachRouter = Router();

outreachRouter
  .route('/')
  .get(getAllContacts)
  .post(createContact)
  .delete(deleteAll);
// outreachRouter.route('/create-many').post(createManyContact)

export default outreachRouter;
