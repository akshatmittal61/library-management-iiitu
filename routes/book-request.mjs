import { Router } from "express";
import { getAllBookRequests } from "../controllers/book-request.mjs";

const router = Router();

router.get("/", getAllBookRequests);

export default router;
