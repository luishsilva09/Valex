import { Router } from 'express';
import * as CardasController from '../controllers/cardController';
import { validKey } from '../middlewares/validKey';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import { cardSchemas } from '../schemas/cardSchemas';



const CardRoutes = Router();

CardRoutes.post('/createCard', schemaValidate(cardSchemas.createCardSchema),validKey ,CardasController.insertCard)
CardRoutes.patch('/activeCard', schemaValidate(cardSchemas.activeCardSchema),CardasController.activeCard)
CardRoutes.get('/balanceTransactions/:cardId',CardasController.viewBalenceTransactions)
CardRoutes.patch('/blockCard/:block',schemaValidate(cardSchemas.blockSchema),CardasController.blockedCard) // usar apenas true para bloquear e false para desbloquear


export default CardRoutes;