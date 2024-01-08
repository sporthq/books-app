import express from 'express';
import Books from '../models/Books.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const booksRoutes = express.Router();

const getBooks = async (req, res) => {
	try {
		const books = await Books.find({}).maxTimeMS(20000);

		res.json({
			books,
		});
	} catch (error) {
		res.status(404).json({ message: 'Wystąpił błąd, spróbuj ponownie' });
	}
};

const getSingleBook = async (req, res) => {
	try {
		const book = await Books.findById(req.params.id);

		if (!book) {
			return res.status(404).json({ message: 'Nie ma takiej książki' });
		}

		res.json(book);
	} catch (error) {
		return res.status(500).json({ message: 'Nie udało się znaleźć ksiązki, sprobuj ponownia' });
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

const createBookReview = asyncHandler(async (req, res) => {
	const { rating, contentReview, id } = req.body;


	const book = await Books.findById(req.params.id);
	const user = await User.findById(id);
	

	// todo odkomentuj to: *user dodaje tylko raz recenzje
	if (book) {
		const alreadyReviewed = book.reviews.find((r) => r.user && user._id && r.user.toString() === user._id.toString());

		if (alreadyReviewed) {
			return res.status(400).json({ message: 'Ta książka została już przez Ciebie oceniona.' });
		}

		const reviewId = new mongoose.Types.ObjectId();

		const review = {
			name: user.name,
			bookInfo: book._id,
			rating: Number(rating),
			contentReview,
			user: user._id,
			_id: reviewId,
		};

		

		if (review.rating <= 0) {
			return res.status(400).json({ message: 'Przyznaj ilość ⭐!' });
		}
		if (!review.contentReview) {
			return res.status(400).json({ message: 'Uzupełnij treść recenzji!' });
		}

		// book.reviews.push(review);
		book.reviews = [...book.reviews, review];
		
		book.numOfReviews = book.reviews.length;
		const totalRating = book.reviews.reduce((acc, item) => item.rating + acc, 0);
		book.rating = book.numOfReviews > 0 ? totalRating / book.numOfReviews : 0;

		// Sprawdzenie, czy book.rating nie jest NaN
		if (isNaN(book.rating)) {
			book.rating = 0; // Przypisanie domyślnej wartości, jeśli book.rating jest NaN
		}

		user.reviews = [...user.reviews, review];
		await Promise.all([user.save(), book.save()]);
		res.status(201).json({ message: 'Recenzja została dodana.' });
	} else {
		res.status(404).json({ message: 'Recenzja nie została dodana, spróbuj ponownie.' });
	}
});

const getAllReviews = async (req, res) => {
	const book = await Books.findById(req.params.id);
	const page = parseInt(req.query.page);
	const PAGE_SIZE = 5;

	if (book) {
		res.json(book.reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).reverse());
	} else {
		res.status(404).json({ message: 'Nie ma takiej ksiązki.' });
	}
};

booksRoutes.route('/').get(getBooks);
booksRoutes.route('/:id').get(getSingleBook);
booksRoutes.route('/').post(addBookToDb);
booksRoutes.route('/reviews/:id').post(createBookReview);
booksRoutes.route('/reviews/:id').get(getAllReviews);

export default booksRoutes;
