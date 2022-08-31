import {Router} from "express";
import CardRoutes from "./CardRoutes";
const router = Router();

router.use(CardRoutes)

export default router;