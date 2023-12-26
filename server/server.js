import dotenv from 'dotenv';
dotenv.config();

import connectToDB from './db.js';
import express from 'express';
import cors from 'cors';

// routes
import booksRoutes from './routes/booksRoutes.js';
import userRoutes from './routes/userRoutes.js';
connectToDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);

// google send from ENV GOOGLE_CLIENT_ID
console.log(process.env.GOOGLE_CLIENT_ID);
app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));

const port = 5000;

app.get('/', (req, res) => {
	res.json({ message: 'Api is running' });
});

app.listen(port, () => {
	console.log(`Server run on port ${port}`);
});
