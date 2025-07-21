import { Router } from "express";
import { uploadDocument } from "../controllers";

const router = Router();

router.get("/", uploadDocument);

export default router