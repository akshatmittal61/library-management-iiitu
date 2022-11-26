import { Router } from "express";
import { addBook, getAllBooks, getBookById } from "../controllers/books.mjs";
import { isAdmin } from "../middleware/auth.mjs";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", isAdmin, addBook);

export default router;
