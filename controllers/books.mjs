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

export { getAllBooks, getBookById };
