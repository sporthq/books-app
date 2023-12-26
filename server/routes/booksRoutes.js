import express from 'express';
import Books from '../models/Books.js';

const booksRoutes = express.Router();

const getBooks = async (req, res) => {
	const books = await Books.find({}).maxTimeMS(20000);
	res.json({
		books,
		pagination: {},
	});
};

const getSingleBook = async (req, res) => {
	const book = await Books.findById(req.params.id);
	if (book) {
		res.json(book);
	} else {
		res.status(404).json`Nie ma takiej ksiązki`;
	}
};

const addBookToDb = async (req, res) => {
	const { title, author, publishedDate, image, reviews, numOfReviews, rating } = req.body;

	const newBook = await Books.create({
		title,
		author,
		publishedDate,
		image,
		reviews,
		numOfReviews,
		rating,
	});

	await newBook.save();

	const books = await Books.find({});

	if (newBook) {
		res.json();
	} else {
		res.status(404).json({ message: 'Nie udało się dodać książki' });
	}
};

const createBookReview = async (req, res) => {};

booksRoutes.route('/').get(getBooks);
booksRoutes.route('/:id').get(getSingleBook);
booksRoutes.route('/').post(addBookToDb);

export default booksRoutes;
