import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from '../styles/GlobalStyles';

import Dashboard from './pages/Dashboard';
import AppLayout from './ui/AppLayout';
import SingleBook from './pages/SingleBook';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerify from './pages/EmailVerify';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
	const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	console.log(googleClient);

	// old v.
	// const [googleClient, setGoogleClient] = useState(null);

	// useEffect(() => {
	// 	console.log('googleClient:', googleClient);
	// 	const googleKey = async () => {
	// 		try {
	// 			const { data: googleId } = await axios.get('http://localhost:5000/api/config/google');

	// 			setGoogleClient(googleId);
	// 		} catch (error) {
	// 			console.error('Błąd podczas pobierania klucza Google:', error);
	// 		}
	// 	};

	// 	googleKey();
	// }, [googleClient]);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});

	// return !googleClient ? (
	// 	<p>Loading</p>
	// ) : (
	return (
		<GoogleOAuthProvider clientId={googleClient}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<Router>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<Navigate replace to='dashboard' />} />
							<Route path='dashboard' element={<Dashboard></Dashboard>} />
							<Route path='books/:bookId' element={<SingleBook />}></Route>
						</Route>
						<Route path='login' element={<Login />}></Route>
						<Route path='register' element={<Register />}></Route>
						<Route path='email-verify/:token' element={<EmailVerify />}></Route>
						<Route path='/password-reset/:token' element={<ResetPassword />}></Route>
						<Route path='/password-reset' element={<ForgotPassword />}></Route>
						{/* <Route element={<PageNotFound />}></Route> */}
					</Routes>
				</Router>
				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							color: 'var(--accent-150)',
							backgroundColor: '#fff',
							border: '1px solid var(--accent-100)',
						},
					}}
				/>
			</QueryClientProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
