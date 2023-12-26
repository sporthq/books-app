import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';
import Token from '../models/Token.js';
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

	if (user && user.googleId){
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
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
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
	const { email, password } = req.body;
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400).json({ message: 'Ten e-mail już istnieje w naszej bazie danych' });
	}

	if (userExist?.active === false) {
		res.status(400).json({ message: 'Sprawdź swój e-mail i aktywuj swoje konto' });
	}

	const user = await User.create({ email, password });

	const confirmToken = crypto.randomBytes(32).toString('hex') + user._id;

	const token = new Token({
		userId: user._id,
		token: confirmToken,
		createdAt: Date.now(),
		expiresAt: Date.now() + 72 * 60 * 60 * 1000, // dodajemy 24 godziny do aktualnego czasu
	});

	await token.save();
	const newToken = genToken(user._id);

	sendVerificationEmail(confirmToken, email);

	if (user) {
		res.status(201).json({
			_id: user._id,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			token: newToken,
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
		});
	} else {
		res.status(400).json({ message: `Coś poszło nie tak, spróbuj ponownie.` });
		// throw new Error('Coś poszło nie tak, spróbuj ponownie.');
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
	// verificationToken.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
	// await verificationToken.save();

	// Usunięcie tokenu weryfikacyjnego z bazy danych
	// todo skasuj token
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
		// res.status(401).json({ message: 'Zmaiana hasła się nie powiodła, token wygasł.' });

		if (error.name === 'TokenExpiredError') {
			res.status(401).json({ message: 'Token wygasł. Spróbuj ponownie, zrestuj hasło ponownie!' });
		} else {
			res.status(500).json({ message: 'Wystąpił nieznany błąd.' });
		}
	}
});

// google login
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, googleImage } = req.body;
	try {
		const user = await User.findOne({ googleId });
		if (user) {

			user.firstLogin = false;
			await user.save();
			res.json({
				_id: user._id,
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
				firstLogin: user.firstLogin,
				// token: genToken(user._id, 24 * 60 * 60),
				active: true,
				createdAt: user.createdAt,
			});
		} else {
	
			const newUser = await User.create({ googleId, email, googleImage });
			
			res.json({
				_id: newUser._id,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				firstLogin: newUser.firstLogin,
				token: genToken(newUser._id, 24 * 60 * 60),
				active: newUser.active,
				createdAt: newUser.createdAt,
			});
		}
	} catch (error) {
		res.status(404).json({ message: 'Wystąpił błąd podczas logowania, spróbuj ponownie poźniej.' });
	}
});

userRoute.route('/login').post(login);
userRoute.route('/register').post(registerUser);
userRoute.route('/verify-email/:token').get(verifyEmail);
userRoute.route('/password-reset-request').post(passwordResetRequest);
userRoute.route('/password-reset').post(passwordReset);
userRoute.route('/google-login').post(googleLogin);
export default userRoute;
