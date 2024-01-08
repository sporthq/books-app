import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import LoginFormBox from './LoginFormBox';
import SpinnerMini from './SpinnrerMini';

import toast from 'react-hot-toast';
import useLogin from '../features/authentication/useLogin';
import { googleLogin } from '../services/authentication/apiUsers';

import Form from './Form';
import InputForm from './InputForm';

const LinksBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const GoogleIcon = styled(FcGoogle)`
	font-size: 2.05rem;
`;
const FormLogin = () => {
	const navigate = useNavigate();
	const { loginUser, isPending, error } = useLogin();
	const { register, handleSubmit, formState } = useForm();

	const { errors } = formState;

	function onSubmit(data) {
		const { email, password } = data;

	
		loginUser({ email, password });
	}
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (res) => {
			try {
				const userInfo = await axios
					.get('https://www.googleapis.com/oauth2/v3/userinfo', {
						headers: { Authorization: `Bearer ${res.access_token}` },
					})
					.then((res) => res.data);


				const { sub, email, name, picture } = userInfo;
				
				await googleLogin(sub, email, name, picture);
				toast.success('Logowanie zakończone pomyślnie');
				navigate('/');
				// Dodaj kod do obsługi uzyskanych danych, na przykład zapisz je w stanie komponentu.
			} catch (error) {
				toast.error('Błąd podczas pobierania informacji o użytkowniku z Google');
			}
		},
	});
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{error ? <ErrorMessage>{error.message}</ErrorMessage> : ''}
				<LoginFormBox>
					<label htmlFor='email'>E-mail</label>
					<InputForm
						disabled={isPending}
						autoComplete='username'
						type='email'
						id='email'
						{...register('email', {
							required: 'Uzupłenij to pole!',
						})}
					/>
					<ErrorMessage>{errors?.email?.message}</ErrorMessage>
				</LoginFormBox>
				<LoginFormBox>
					<label htmlFor='password'>Hasło</label>
					<InputForm
						disabled={isPending}
						type='password'
						id='password'
						{...register('password', {
							required: 'Uzupełnij to pole!',
						})}
					/>
					<ErrorMessage>{errors?.password?.message}</ErrorMessage>
				</LoginFormBox>
				<LoginFormBox>
					<Button
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
						type='submit'
						$sizes='medium'
						$variations='primary'
					>
						{isPending ? <SpinnerMini /> : 'Zaloguj'}
					</Button>
					<Button
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.75rem' }}
						$sizes='medium'
						$variations='tertiary'
						type='button'
						onClick={() => handleGoogleLogin()}
					>
						<GoogleIcon />
						Zaloguj przez konto Google
					</Button>
				</LoginFormBox>
				<LinksBox>
					<Link to='/register'>
						<Button style={{ padding: '0 0' }} type='submit' $sizes='medium' $variations='secondary'>
							Załóż konto
						</Button>
					</Link>
					<Link to='/password-reset'>
						<Button
							disabled={isPending}
							style={{ padding: '0 0' }}
							type='submit'
							$sizes='medium'
							$variations='secondary'
						>
							Zapomniałem hasło
						</Button>
					</Link>
				</LinksBox>
			</Form>
		</>
	);
};

export default FormLogin;
