import { Router } from "express";
import { verifyUserByAdmin } from "../controllers/admin.mjs";
import auth, { isAdmin } from "../middleware/auth.mjs";

const router = Router();

router.use(auth, isAdmin);
router.post("/", verifyUserByAdmin);

export default router;
