import { Router } from "express";
import {
	addBook,
	editBook,
	getAllBooks,
	getBookById,
	issueBook,
	removeBook,
	returnBook,
} from "../controllers/books.mjs";
import auth, { verifyUserRole } from "../middleware/auth.mjs";
import { USER_ROLES } from "../models/User.mjs";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post(
	"/",
	auth,
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	addBook
);
router.put("/issue", auth, verifyUserRole(USER_ROLES.LIBRARIAN), issueBook);
router.put("/return", auth, verifyUserRole(USER_ROLES.LIBRARIAN), returnBook);
router.put(
	"/:id",
	auth,
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	editBook
);
router.delete(
	"/:id",
	auth,
	verifyUserRole([USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN]),
	removeBook
);

export default router;
