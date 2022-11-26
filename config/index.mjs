import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;
export const dbUri = process.env.DB_URI;
export const jwtSecret = process.env.JWT_SECRET;
