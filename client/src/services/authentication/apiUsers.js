import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL;

export const login = async ({ email, password }) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`${baseURL}/api/users/login`, { email, password }, config);
		localStorage.setItem('userInfo', JSON.stringify(data));
		return data;
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

export const register = async ({ email, password }) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`${baseURL}/api/users/register`, { email, password }, config);
		// localStorage.setItem('userInfo', JSON.stringify(data));
		return data;
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

export const verifyEmail = async (token) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const res = await axios.get(`${baseURL}/api/users/verify-email/${token}`, config);

		return res;
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

export const forgotPassword = async (email) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		await axios.post(`${baseURL}/api/users/password-reset-request`, { email }, config);
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

export const resetPassword = async ({ password, token }) => {
	try {
		const config = { headers: { Authorization: `Beared ${token}`, 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`${baseURL}/api/users/password-reset`, { password }, config);
		return data;
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

export const googleLogin = async (googleId, email, googleImage) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`${baseURL}/api/users/google-login`, { googleId, email, googleImage }, config);
		console.log(data);
		localStorage.removeItem('userInfo');
		localStorage.setItem('userInfo', JSON.stringify(data));
		return data;
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
