import { Router } from "express";
import {
	addBook,
	editBook,
	getAllBooks,
	getBookById,
	removeBook,
} from "../controllers/books.mjs";
import { verifyUserRole } from "../middleware/auth.mjs";
import { USER_ROLES } from "../models/User.mjs";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post(
	"/",
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	addBook
);
router.put(
	"/:id",
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	editBook
);
router.delete(
	"/:id",
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	removeBook
);

export default router;
