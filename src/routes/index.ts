import {Router} from "express";
import CardRoutes from "./CardRoutes";
import PaymentRoute from "./PaymentRoutes";
import RechargesRoute from "./RechargesRoutes";
const router = Router();

router.use(CardRoutes)
router.use(RechargesRoute)
router.use(PaymentRoute)

export default router;