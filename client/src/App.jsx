import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import EmailVerify from './pages/EmailVerify';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SingleBook from './pages/SingleBook';
import UserProfile from './pages/UserProfile';

import AppLayout from './ui/AppLayout';
import AllBooks from './pages/AllBooks';

function App() {
	const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});

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
							<Route path='/user-profile/:userId' element={<UserProfile />}></Route>
							<Route path='/all-books' element={<AllBooks />}></Route>
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
