import { Router } from "express";
import { handleZohoCallback, redirectToZoho } from "../controllers";

const router = Router();

router.get("/zoho", redirectToZoho);
router.get("/callback", handleZohoCallback);

export default router;
