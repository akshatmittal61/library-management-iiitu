import express from "express";
import cors from "cors";
import { PORT } from "./config/index.mjs";
import connect from "./db/index.mjs";
import apiAuth from "./routes/auth.mjs";
import apiBooks from "./routes/books.mjs";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use(express.json());
app.use(cors("*"));

app.use("/api/auth", apiAuth);
app.use("/api/books", apiBooks);

app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});
