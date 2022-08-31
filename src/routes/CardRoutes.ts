import { Router } from 'express';
import { insertCard } from '../controllers/cardController';
import { validKey } from '../middlewares/validKey';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import createCardSchema from '../schemas/createCardSchema';


const CardRoutes = Router();

CardRoutes.post('/create', schemaValidate(createCardSchema),validKey ,insertCard)

export default CardRoutes;