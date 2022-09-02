import {Router} from "express";
import CardRoutes from "./CardRoutes";
import RechargesRoute from "./RechargesRoutes";
const router = Router();

router.use(CardRoutes)
router.use(RechargesRoute)

export default router;