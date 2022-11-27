import { Router } from "express";
import { getAllNotifications } from "../controllers/user.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/notifications", auth, getAllNotifications);

export default router;
