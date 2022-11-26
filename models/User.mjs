import mongoose from "mongoose";

export const USER_ROLES = {
	ADMIN: "admin",
	LIBRARIAN: "librarian",
	FACULTY: "faculty",
	STUDENT: "student",
};

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.STUDENT,
		},
		booksIssued: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Book",
			},
		],
		fine: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
