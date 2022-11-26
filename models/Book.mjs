import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		cover: {
			type: String,
			default: "https://m.media-amazon.com/images/I/81MmomTwghL.jpg",
		},
		category: {
			type: String,
		},
		copies: {
			type: Number,
			required: true,
			default: 1,
		},
		copiesAvailableInLibrary: {
			type: Number,
			required: true,
			default: 1,
		},
		issuedTo: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
