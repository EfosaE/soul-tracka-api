import { Router } from 'express';
import { createContact, deleteAll, getAllContacts, getByID, updateContact } from '../controllers/outreachController';

const outreachRouter = Router();

outreachRouter
  .route('/')
  .get(getAllContacts)
  .post(createContact)
  .delete(deleteAll);
// outreachRouter.route('/create-many').post(createManyContact)
outreachRouter.route('/:id').get(getByID).delete().patch(updateContact)

export default outreachRouter;
