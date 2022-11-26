import mongoose from "mongoose";
import { dbUri } from "../config/index.mjs";

const connect = async () => {
	return mongoose
		.connect(dbUri)
		.then(() => {
			console.info("Connected to MongoDB successfully.");
		})
		.catch((err) => {
			console.error(err.message);
			process.exit(1);
		});
};

export default connect;
