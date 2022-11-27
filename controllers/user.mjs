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

const markNotificationAsRead = async (req, res) => {
	try {
		const { id } = req.user;
		const { notificationId } = req.params;
		const notification = await Notification.findById(notificationId);
		if (!notification)
			return res.status(404).json({ message: "Notification not found" });
		if (notification.user.toString() !== id)
			return res.status(401).json({ message: "Unauthorized" });
		notification.read = true;
		await notification.save();
		return res.status(200).json({ message: "Notification marked as read" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const markAllNotificationsAsRead = async (req, res) => {
	try {
		const { id } = req.user;
		await Notification.updateMany(
			{ user: id },
			{
				read: true,
			}
		);
		return res
			.status(200)
			.json({ message: "All notifications marked as read" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export {
	getAllNotifications,
	markNotificationAsRead,
	markAllNotificationsAsRead,
};
