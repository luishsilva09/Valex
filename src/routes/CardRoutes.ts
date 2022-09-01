import { Router } from 'express';
import * as CardasController from '../controllers/cardController';
import { validKey } from '../middlewares/validKey';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import createCardSchema from '../schemas/createCardSchema';
import activeCardSchema from '../schemas/activeCardschema';



const CardRoutes = Router();

CardRoutes.post('/create', schemaValidate(createCardSchema),validKey ,CardasController.insertCard)
CardRoutes.post('/activeCard', schemaValidate(activeCardSchema),CardasController.activeCard)
CardRoutes.get('/viewCards',CardasController.viewCards)
CardRoutes.get('/balanceTransactions',CardasController.viewBalenceTransactions)
CardRoutes.patch('/blockedCard',CardasController.blockedCard)
CardRoutes.patch('/unblockedCard',CardasController.unlockedCard)


export default CardRoutes;