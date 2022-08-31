import { Router } from 'express';
import { insertCard } from '../controllers/insertCard';
import { createValid } from '../middlewares/createValid';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import cardTypeSchema from '../schemas/cardTypes';

const CardRoutes = Router();

CardRoutes.post('/create', schemaValidate(cardTypeSchema),createValid ,insertCard)

export default CardRoutes;