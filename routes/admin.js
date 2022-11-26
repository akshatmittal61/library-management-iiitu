import { Router } from "express";
import { verifyUserByAdmin } from "../controllers/admin";
import { isAdmin } from "../middleware/auth.mjs";

const router = Router();

router.use(isAdmin);
router.post("/", verifyUserByAdmin);

export default router;
