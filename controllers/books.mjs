import Book from "../models/Book.mjs";
import Notification, { NOTIFICATION_TYPES } from "../models/Notification.mjs";
import User from "../models/User.mjs";
import { getUserById } from "../services/user.mjs";

const getAllBooks = async (req, res) => {
	try {
		const allBooks = await Book.find();
		res.status(200).json({
			message: "All books fetched successfully",
			books: allBooks,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBookById = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) return res.status(404).json({ message: "Book not found" });
		res.status(200).json({
			message: "Book fetched successfully",
			book,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const addBook = async (req, res) => {
	try {
		const { title, author, price, cover, copies } = req.body;
		if (!title || !author || !price)
			return res
				.status(400)
				.json({ message: "Please Fill All the Fields" });
		const book = new Book({
			title,
			author,
			price,
			cover: cover
				? cover
				: "https://m.media-amazon.com/images/I/81MmomTwghL.jpg",
			copies: copies ? copies : 1,
		});
		await book.save();
		return res
			.status(201)
			.json({ message: "Added new book to the Database" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const editBook = async (req, res) => {
	const { id } = req.params;
	try {
		const { ...updatedFields } = req.body;
		let foundBook = await Book.findById(id);
		if (!foundBook)
			return res
				.status(404)
				.json({ message: "Couldn't find the book you searched for" });
		let updatedBook = await Book.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedBook: updatedBook,
			message: "Updated Book Info",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res
				.status(404)
				.json({ message: "Couldn't find the book you searched for" });
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const removeBook = async (req, res) => {
	const { id } = req.params;
	try {
		const foundBook = await Book.findById(id);
		if (!foundBook)
			return res
				.status(404)
				.json({ message: "Couldn't find the book you searched for" });
		await Book.findByIdAndDelete(id);
		return res
			.status(200)
			.json({ message: "Removed book from the library" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res
				.status(404)
				.json({ message: "Couldn't find the book you searched for" });
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const issueBook = async (req, res) => {
	const { bookId, userId } = req.body;
	try {
		const foundUser = await getUserById(userId);
		if (!foundUser)
			return res
				.status(404)
				.json({ message: "Couldn't find the user you searched for" });
		if (!foundUser.verified)
			return res.status(400).json({ message: "User is not verified" });
		if (foundUser.booksIssued.length >= 3)
			return res
				.status(400)
				.json({ message: "User has already issued 3 books" });
		const foundBook = await Book.findById(bookId);
		if (!foundBook)
			return res.status(404).json({
				message: "Couldn't find the book you searched for",
			});
		if (
			foundBook.issuedTo.includes(userId) ||
			foundUser.booksIssued.includes(bookId)
		)
			return res
				.status(400)
				.json({ message: "Book already issued to user" });
		if (foundBook.copiesAvailableInLibrary === 0)
			return res.status(409).json({
				message: "No copies of this book are available in the library",
			});
		const updatedBook = await Book.findByIdAndUpdate(
			bookId,
			{
				$inc: { copiesAvailableInLibrary: -1 },
				$push: { issuedTo: userId },
			},
			{ new: true }
		);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { booksIssued: bookId } },
			{ new: true }
		);
		const newNotificaion = new Notification({
			title: "New Book Issued",
			message: `${foundBook.title} has been issued to you`,
			type: NOTIFICATION_TYPES.SUCCESS,
			user: userId,
		});
		newNotificaion.save();
		return res.status(200).json({
			message: "Book issued successfully",
			updatedBook,
			updatedUser,
			notification: newNotificaion,
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({
				message: "Couldn't find the book you searched for",
			});
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const returnBook = async (req, res) => {
	const { bookId, userId } = req.body;
	try {
		const foundUser = await getUserById(userId);
		if (!foundUser)
			return res.status(404).json({ message: "User not found" });
		const foundBook = await Book.findById(bookId);
		if (!foundBook)
			return res.status(404).json({ message: "Book not found" });
		if (
			!foundBook.issuedTo.includes(userId) ||
			!foundUser.booksIssued.includes(bookId)
		)
			return res.status(400).json({ message: "Book not issued to user" });
		const updatedBook = await Book.findByIdAndUpdate(
			bookId,
			{
				$inc: { copiesAvailableInLibrary: 1 },
				$pull: { issuedTo: userId },
			},
			{ new: true }
		);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $pull: { booksIssued: bookId } },
			{ new: true }
		);
		const newNotificaion = new Notification({
			title: "Book returned",
			message: `${foundBook.title} has been returned to the library`,
			type: NOTIFICATION_TYPES.SUCCESS,
			user: userId,
		});
		newNotificaion.save();
		return res.status(200).json({
			message: "Book returned successfully",
			updatedBook,
			updatedUser,
			notification: newNotificaion,
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Book not found" });
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export {
	getAllBooks,
	getBookById,
	addBook,
	editBook,
	removeBook,
	issueBook,
	returnBook,
};
