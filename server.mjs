import express from "express";
import { PORT } from "./config/index.mjs";
import connect from "./db/index.mjs";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});
