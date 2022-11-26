import Book from "../models/Book.mjs";

const getBookById = async (id) => {
	try {
		const foundBook = await Book.findById(id).select("-password");
		if (!foundBook) return null;
		return foundBook;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export { getBookById };
