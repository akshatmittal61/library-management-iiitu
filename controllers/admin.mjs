import User from "../models/User.mjs";

const verifyUserByAdmin = async (req, res) => {
	const { userId } = req.body;
	try {
		if (!userId)
			return res.status(400).json({ message: "User Id is required" });
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		if (user.verified)
			return res.status(403).json({ message: "User already verified" });
		const { ...updatedUser } = req.body;
		if (updatedUser.verifyUser) {
			await User.findByIdAndUpdate(
				userId,
				{ $set: { role: updatedUser.role, verified: true } },
				{ new: true }
			);
			return res.status(202).json({
				user,
				message: `User verified as ${
					updatedUser.role ? updatedUser.role : user.role
				}`,
			});
		} else {
			await User.findByIdAndDelete(userId);
			return res
				.status(403)
				.json({ message: "Request for verification denied" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export { verifyUserByAdmin };
