import { Router } from 'express';
import { createContact, deleteAll, getAllContacts, getByID } from '../controllers/outreachController';

const outreachRouter = Router();

outreachRouter
  .route('/')
  .get(getAllContacts)
  .post(createContact)
  .delete(deleteAll);
// outreachRouter.route('/create-many').post(createManyContact)
outreachRouter.route('/:id').get(getByID).delete().patch()

export default outreachRouter;
