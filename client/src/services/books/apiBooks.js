import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL;

// get all data
export const getAllBooks = async () => {
	try {
		const res = await axios.get(`${baseURL}/api/books`);

		return res.data?.books;
	} catch (error) {
		console.log(error.message);
	}
};

// get single book

export async function getSingleBook(id) {
	try {
		const res = await axios.get(`${baseURL}/api/books/${id}`);
		return res.data;
	} catch (error) {
		throw new Error(error.message);
	}
}

// add book to DB
export const addNewBookToDb = async (data) => {
	try {
		const res = await axios.post(`${baseURL}/api/books/`, data);
	} catch (error) {
		throw new Error(error.message);
	}
};
