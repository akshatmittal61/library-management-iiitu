import mongoose from "mongoose";

export const NOTIFICATION_TYPES = {
	WARNING: "warning",
	SUCCESS: "success",
	ERROR: "error",
	INFO: "info",
};

const NotificationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(NOTIFICATION_TYPES),
			default: NOTIFICATION_TYPES.INFO,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
