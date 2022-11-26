import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.mjs";
import auth from "../middleware/auth.mjs";
import {
	validateEamil,
	validatePassword,
	validatePhone,
} from "../middleware/validate.mjs";

const router = Router();

router.post(
	"/register",
	validateEamil,
	validatePhone,
	validatePassword,
	register
);
router.post("/login", validateEamil, validatePassword, login);
router.get("/", auth, verifyUser);

export default router;
