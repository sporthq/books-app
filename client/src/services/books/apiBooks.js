import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL;

// get all data
export const getAllBooks = async () => {
	try {
		const res = await axios.get(`${baseURL}/api/books`);

		return res.data?.books;
	} catch (error) {
		throw new Error(
			error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: error.message
				  ? error.message
				  : 'Wystąpił nieznany błąd.'
		);
	}
};

export async function getSingleBook(id) {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const res = await axios.get(`${baseURL}/api/books/${id}`, config);

		if (res.data) {
			return res.data;
		} else if (res.status === 404) {
			return null;
		} else {
			throw new Error(
				res.response && res.response.data && res.response.data.message
					? res.response.data.message
					: res.message
					  ? res.message
					  : 'Wystąpił nieznany błąd.'
			);
		}
	} catch (error) {
		throw new Error(
			error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: error.message
				  ? error.message
				  : 'Wystąpił nieznany błąd.'
		);
	}
}

// add book to DB
export const addNewBookToDb = async (data) => {
	try {
		const res = await axios.post(`${baseURL}/api/books/`, data);
	} catch (error) {
		throw new Error(
			error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: error.message
				  ? error.message
				  : 'Wystąpił nieznany błąd.'
		);
	}
};

export const createBookReview = async ({ bookId, id, contentReview, rating }) => {
	try {
		const res = await axios.post(`${baseURL}/api/books/reviews/${bookId}`, {
			id,
			contentReview,
			rating,
		});

		return res.data;
	} catch (error) {
		throw new Error(
			error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: error.message
				  ? error.message
				  : 'Wystąpił nieznany błąd.'
		);
	}
};

export const getAllReviews = async (bookId, pageNumber) => {
	try {
		const res = await axios.get(`${baseURL}/api/books/reviews/${bookId}?page=${pageNumber}`);
		return res.data;
	} catch (error) {
		throw new Error(
			error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: error.message
				  ? error.message
				  : 'Wystąpił nieznany błąd.'
		);
	}
};
