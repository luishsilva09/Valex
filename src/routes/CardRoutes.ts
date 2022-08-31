import { Router } from 'express';
import { insertCard } from '../controllers/insertCard';
import { createValid } from '../middlewares/createValid';

const CardRoutes = Router();

CardRoutes.post('/create', createValid ,insertCard)

export default CardRoutes;