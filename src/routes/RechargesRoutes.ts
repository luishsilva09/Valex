import {Router} from 'express';
import * as rechageController from '../controllers/rechargesController'
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import { validKey } from '../middlewares/validKey';
import rechargeSchema from '../schemas/rechargeSchema';

const RechargesRoute = Router();

RechargesRoute.post('/recharge/:cardId',validKey,schemaValidate(rechargeSchema),rechageController.recharge)

export default RechargesRoute;