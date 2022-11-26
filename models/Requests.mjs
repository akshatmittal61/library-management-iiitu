import mongoose from "mongoose";

const BookRequestSchema = mongoose.Schema(
	{
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const BookRequest = mongoose.model("BookRequest", BookRequestSchema);

export default BookRequest;
