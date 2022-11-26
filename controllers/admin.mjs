import User from "../models/User.mjs";

const verifyUserByAdmin = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		const { ...updatedUser } = req.body;
		if (updatedUser.verifyUser) {
			await User.findByIdAndUpdate(
				userId,
				{ $set: { role: updatedUser.role, verified: true } },
				{ new: true }
			);
			return res.status(202).json({
				user,
				message: `User verified as ${updatedUser.role}`,
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
