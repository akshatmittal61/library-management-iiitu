import User from "../models/User.mjs";

const getUserById = async (id) => {
	try {
		const foundUser = await User.findById(id).select("-password");
		if (!foundUser) return null;
		return foundUser;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export { getUserById };
