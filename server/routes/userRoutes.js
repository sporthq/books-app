import crypto from 'crypto';
import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import Token from '../models/Token.js';
import User from '../models/User.js';
import Books from '../models/Books.js';
const userRoute = express.Router();

// TODO zmień expiriesIn
const genToken = (id, expire = 24 * 60 * 60) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: `${expire}s` });
};

// login
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(401).json({ message: 'Podany użytkownik nie istnieje' });
	}

	if (user && user.googleId) {
		res.status(401).json({ message: 'Cos poszło nie tak, spróbuj zalogować sie przez konto Google.' });
	}
	if (user && (await user.matchPassword(password))) {
		let verificationToken = await Token.findOne({ userId: user._id });
		if (verificationToken && verificationToken.expiresAt < Date.now()) {
			// Usunięcie wygasłego tokenu z bazy danych
			await Token.deleteOne({ token: verificationToken.token });

			// Sprawdzenie, czy usunięto token
			verificationToken = await Token.findOne({ userId: user._id });
			if (!verificationToken) {
				// Usunięcie użytkownika
				await User.deleteOne({ _id: user._id });

				return res.status(400).json({
					message: 'Twój token wygasł. Załóż nowe konto.',
					createNewAccount: true,
				});
			}
		}
		user.firstLogin = false;
		if (!user.active) {
			return res
				.status(401)
				.json({ message: 'Konto nie zostało zweryfikowane. Sprawdź e-mail aby dokończyć rejestrację!' });
		}

		await user.save();

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			reviews: user.reviews,
			token: genToken(user._id, 24 * 60 * 60),
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
		});
	} else {
		res.status(401).json({ message: 'Błędny email lub hasło' });
	}
});

// register
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExistEmail = await User.findOne({ email });
	const userExistName = await User.findOne({ name });

	if (userExistEmail) {
		res.status(400).json({ message: 'Ten e-mail już istnieje w naszej bazie danych.' });
	}
	if (userExistName) {
		res.status(400).json({ message: `Nazwa ${name} jest już zajęta.` });
	}

	if (userExistEmail?.active === false) {
		res.status(400).json({ message: 'Sprawdź swój e-mail i aktywuj swoje konto!' });
	}

	const user = await User.create({ name, email, password });

	const confirmToken = crypto.randomBytes(32).toString('hex') + user._id;

	const token = new Token({
		userId: user._id,
		token: confirmToken,
		createdAt: Date.now(),
		expiresAt: Date.now() + 24 * 60 * 60 * 1000, // dodajemy 24 godziny do aktualnego czasu
	});

	await token.save();
	const newToken = genToken(user._id);

	sendVerificationEmail(confirmToken, email);

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			token: newToken,
			reviews: user.reviews,
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
		});
	} else {
		res.status(400).json({ message: `Coś poszło nie tak, spróbuj ponownie.` });
	}
});

// verifyEmail

const verifyEmail = asyncHandler(async (req, res) => {
	const verificationToken = await Token.findOne({ token: req.params.token });

	if (!verificationToken) {
		return res.status(400).json({ message: 'Twój token wygasł lub został aktywowany.' });
	}
	const expiresAt = new Date(verificationToken.expiresAt).getTime();

	if (expiresAt < Date.now()) {
		// DZIAŁANIA JEŚLI TOKEN WYGASŁ!

		await Token.deleteOne({ token: verificationToken.token });

		// Znalezienie użytkownika powiązanego z wygasłym tokenem
		const user = await User.findById(verificationToken.userId);

		// Sprawdzenie, czy użytkownik istnieje
		if (!user) {
			return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
		}

		// Usunięcie użytkownika
		await User.deleteOne({ _id: user._id });

		return res.status(400).json({
			message: 'Twój token wygasł. Załóż nowe konto.',
			createNewAccount: true,
		});
	}
	// Znalezienie użytkownika na podstawie tokenu weryfikacyjnego
	const user = await User.findById(verificationToken.userId);

	if (!user) {
		return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
	}

	// Sprawdzenie, czy użytkownik jest już zweryfikowany
	if (user.active) {
		return res.status(400).json({ message: 'Konto jest już zweryfikowane.' });
	}

	// Uaktualnienie statusu weryfikacji użytkownika
	user.active = true;
	await user.save();

	// Usunięcie tokenu weryfikacyjnego z bazy danych
	await Token.deleteOne({ token: req.params.token });

	res.status(200).json({ message: 'Twoje konto zostało zweryfikowane pomyślnie.' });
});
// forget password
const passwordResetRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const newToken = genToken(user._id, 30 * 60);
			sendPasswordResetEmail(newToken, user?.email);
			res.status(200).json({ message: `Sprawdź swoją pocztę ${email}` });
		} else {
			res.status(404).json({ message: 'Nie znaleziono użytkownika o podanym adresie e-mail' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Wystąpił błąd podczas wysyłania wiadomości, spróbuj ponownie poźniej' });
	}
});

// password reset
const passwordReset = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		const user = await User.findById(decoded.id);
		if (user) {
			user.password = req.body.password;
			await user.save();
			res.json({ message: 'Hasło zostało zmienione pomyślnie.Możesz się teraz zalogować' });
		} else {
			res.status(404).json({ message: 'Nie znaleziono użytkownika o podanym adresie e-mail' });
		}
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			res.status(401).json({ message: 'Token wygasł. Spróbuj ponownie, zrestuj hasło ponownie!' });
		} else {
			res.status(500).json({ message: 'Wystąpił nieznany błąd.' });
		}
	}
});

// google login
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, name, googleImage } = req.body;

	try {
		const user = await User.findOne({ googleId });

		if (user) {
			user.firstLogin = false;
		
			await user.save();
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
				firstLogin: user.firstLogin,
				reviews: user.reviews,

				active: true,
				createdAt: user.createdAt,
			});
		} else {
			
			const newUser = await User.create({
				googleId,
				email,
				name,
				googleImage,
			});

			res.json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				firstLogin: newUser.firstLogin,
				reviews: newUser.reviews,
				token: genToken(newUser._id, 24 * 60 * 60),
				active: newUser.active,
				createdAt: newUser.createdAt,
			});
		}
	} catch (error) {
		res.status(404).json({ message: 'Wystąpił błąd podczas logowania, spróbuj ponownie poźniej.' });
	}
});

const getUserReviews = async (req, res) => {
	try {
		const userId = req.params.userId;

		const user = await User.findById(userId).populate('reviews.bookInfo');
		const page = parseInt(req.query.page);

		const PAGE_SIZE = 6;
		if (!user) {
			res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
		}

	
		const filteredReviews = user.reviews.map((review) => ({

			id: review._id,
			userId: user._id,
			userName: user.name,
			amountReviews: user.reviews.length,
			bookInfo: review.bookInfo,
			contentReview: review.contentReview,
			rating: review.rating,
		}));

		const userReview = filteredReviews.reverse().slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);
		res.json(userReview);
	} catch (error) {
		res.status(500).json({ message: 'Nieoczekiwany bład, spróbuj ponownie.' });
	}
};

const deleteReview = async (req, res) => {
	try {
		const userId = req.params.userId;
		const reviewId = req.params.reviewId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
		}

		const reviewToDelete = user.reviews.find((review) => review._id.toString() === reviewId);

		if (!reviewToDelete) {
			return res.status(404).json({ message: 'Recenzja nie istnieje.' });
		}

		const bookId = reviewToDelete.bookInfo;

		const book = await Books.findById(bookId);

		await Books.updateOne({ _id: bookId }, { $pull: { reviews: { _id: reviewId } } });
		await User.updateOne({ _id: userId }, { $pull: { reviews: { _id: reviewId } } });

		res.status(200).json({ message: 'Recenzja usunięta pomyślnie.' });
	} catch (error) {
		console.error('Błąd podczas usuwania recenzji:', error);
		res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie' });
	}
};


userRoute.route('/login').post(login);
userRoute.route('/register').post(registerUser);
userRoute.route('/verify-email/:token').get(verifyEmail);
userRoute.route('/password-reset-request').post(passwordResetRequest);
userRoute.route('/password-reset').post(passwordReset);
userRoute.route('/google-login').post(googleLogin);
userRoute.route('/:userId').get(getUserReviews);
userRoute.route('/:userId/:reviewId').delete(deleteReview);

export default userRoute;
