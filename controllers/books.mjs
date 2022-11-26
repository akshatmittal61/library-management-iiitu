import Book from "../models/Book.mjs";

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

const addBook = async (req, res, next) => {
	try {
		const { title, author, price, copies } = req.body;
		if (!title || !author || !price)
			return res
				.status(400)
				.json({ message: "Please Fill All the Fields" });
		const book = new Book({
			title,
			author,
			price,
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
		let foundBook = await Book.findById();
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

export { getAllBooks, getBookById, addBook, editBook };
