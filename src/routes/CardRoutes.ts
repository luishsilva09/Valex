import { Router } from 'express';
import { activeCard, insertCard } from '../controllers/cardController';
import { validKey } from '../middlewares/validKey';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import createCardSchema from '../schemas/createCardSchema';


const CardRoutes = Router();

CardRoutes.post('/create', schemaValidate(createCardSchema),validKey ,insertCard)
CardRoutes.post('/activeCard', activeCard)
export default CardRoutes;