import { Router } from "express";
import authRouter from "./auth.routes";
import documentRoutes from "./document.routes";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/documents", documentRoutes);

export default router;
