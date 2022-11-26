import Book from "../models/Book.mjs";
import BookRequest from "../models/Requests.mjs";

const createBookRequest = async (req, res) => {
	const { title, author, categories } = req.body;
	try {
		if (!title || !author || !categories)
			return res
				.status(400)
				.json({ message: "Please Fill All the Fields" });
		const bookRequest = new BookRequest({
			title,
			author,
			categories,
			user: req.user._id,
		});
		await bookRequest.save();
		return res
			.status(201)
			.json({ message: "Book Request Created Successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const getAllBookRequests = async (req, res) => {
	try {
		const allBookRequests = await BookRequest.find();
		res.status(200).json({
			message: "All Book Requests fetched successfully",
			bookRequests: allBookRequests,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBookRequestById = async (req, res) => {
	try {
		const { id } = req.params;
		const bookRequest = await BookRequest.findById(id);
		if (!bookRequest)
			return res.status(404).json({ message: "Book Request not found" });
		res.status(200).json({
			message: "Book Request fetched successfully",
			bookRequest,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const editBookRequest = async (req, res) => {
	const { id } = req.params;
	try {
		const { title, author, categories } = req.body;
		const bookRequest = await Book(id);
		if (!bookRequest)
			return res.status(404).json({ message: "Book Request not found" });
		await BookRequest.findByIdAndUpdate(
			id,
			{ title, author, categories },
			{ new: true }
		);
		await bookRequest.save();
		return res
			.status(200)
			.json({ message: "Book Request Updated Successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const deleteBookRequest = async (req, res) => {
	const { id } = req.params;
	try {
		const bookRequest = await Book.findById(id);
		if (!bookRequest)
			return res.status(404).json({ message: "Book Request not found" });
		await BookRequest.findByIdAndDelete(id);
		return res
			.status(200)
			.json({ message: "Book Request Deleted Successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export {
	createBookRequest,
	getAllBookRequests,
	getBookRequestById,
	editBookRequest,
	deleteBookRequest,
};
