import { Router } from "express";
import { uploadDocument } from "../controllers";
import { upload } from "../utils";

const router = Router();

router.post("/upload", upload.single("document"), uploadDocument);

export default router;
