import { Router } from 'express';
import { insertCard } from '../controllers/insertCard';

const CardRoutes = Router();

CardRoutes.get('/teste', insertCard)

export default CardRoutes;