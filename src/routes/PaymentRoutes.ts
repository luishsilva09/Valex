import { Router} from 'express';
import * as paymentController from '../controllers/paymentController';
import { schemaValidate } from '../middlewares/schemaValidateMiddleware';
import PaymentSchema from '../schemas/paymentsSchemas';
const PaymentsRoute = Router();

PaymentsRoute.post('/payment/POS/:businessId',schemaValidate(PaymentSchema),paymentController.payment)

export default PaymentsRoute;