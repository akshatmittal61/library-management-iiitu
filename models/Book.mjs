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
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
