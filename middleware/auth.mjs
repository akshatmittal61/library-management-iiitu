import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";
import { USER_ROLES } from "../models/User.mjs";

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(401)
			.json({ message: "No Token. Authorization denied" });
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.error(err);
		res.status(401).json({ message: "Token is not valid" });
	}
};

const isAdmin = (req, res, next) => {
	try {
		if (req.user.role === USER_ROLES.ADMIN) next();
		else
			return res.status(403).json({
				message: "You are not authorized to access this route",
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const isLibrarian = (req, res, next) => {
	try {
		if (req.user.role === USER_ROLES.LIBRARIAN) next();
		else
			res.status(403).json({
				message: "You are not authorized to access this route",
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const isFaculty = (req, res, next) => {
	try {
		if (req.user.role === USER_ROLES.FACULTY) next();
		else
			res.status(403).json({
				message: "You are not authorized to access this route",
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const isStudent = (req, res, next) => {
	try {
		if (req.user.role === USER_ROLES.STUDENT) next();
		else
			res.status(403).json({
				message: "You are not authorized to access this route",
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export default auth;
export { isAdmin, isLibrarian, isFaculty, isStudent };
