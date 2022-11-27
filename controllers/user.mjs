import Notification from "../models/Notification.mjs";

const getAllNotifications = async (req, res) => {
	try {
		const { id } = req.user;
		const allNotifications = await Notification.find({ user: id });
		return res.status(200).json({
			message: "All notifications for this user",
			notifications: allNotifications,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export { getAllNotifications };
