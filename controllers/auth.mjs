import { jwtSecret } from "../config/index.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { USER_ROLES } from "../models/User.mjs";

const register = async (req, res) => {
	const { name, email, phone, password, role } = req.body;
	if (!name || !email || !phone || !password)
		return res.status(400).json({ message: "Invalid Data" });
	if (password.length < 6)
		return res
			.status(400)
			.json({ message: "Password should be a minimum 6 characters" });
	try {
		if (!email.includes("@") || !email.includes("."))
			return res.status(400).json({ message: "Invalid Email" });
		else if (email.indexOf("@") > email.indexOf("."))
			return res.status(400).json({ message: "Invalid Email" });
		else if (phone.length !== 10)
			return res.status(400).json({ message: "Invalid Phone Number" });
		if (email.slice(email.length - 12, email.length) !== "@iiitu.ac.in")
			return res.status(400).json({
				message: "Please use your institute email to register",
			});
		let user = await User.findOne({ email });
		if (user) {
			console.info("user", user);
			return res.status(400).json({
				message: "User already registered. Login to continue",
			});
		}
		user = new User({
			name,
			email,
			phone,
			password,
			role: role ? role : USER_ROLES.STUDENT,
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		const payload = { user: { id: user.id } };
		jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token: token,
				message: "User registered, login to continue",
			});
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid Credentials" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid Credentials" });
		const payload = { user: { id: user.id } };
		jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
			if (err) throw err;
			res.status(200).json({ token });
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const verifyUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		return res.json({ user, message: "User Verified" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { register, login, verifyUser };
