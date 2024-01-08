import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSendForgotPassword from '../features/authentication/useSendForgotPassword';

import Logo from '../ui/Logo';
import Heading from './../ui/Heading';
import CompanyName from '../ui/CompanyName';
import LogoTextBottom from '../ui/LogoTextBottom';
import LoginFormBox from '../ui/LoginFormBox';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import SpinnerMini from '../ui/SpinnrerMini';
import SuccesMessage from '../ui/SuccessMessage';
import InputForm from '../ui/InputForm';

const LoginLayout = styled.main`
	display: grid;
	align-content: center;
	justify-content: center;
	grid-template-columns: 48rem;
	min-height: 100vh;

	gap: 3.2rem;

	/* 576px */
	@media only screen and (max-width: 36em) {
		grid-template-columns: 43rem;
	}
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;

	gap: 2.4rem;
	padding: 2.4rem 4rem;
	box-shadow: var(--shadow-md);
`;

const LinksBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

function EmailVerify() {
	const { sendForgotPassword, isPending, error, isSuccess } = useSendForgotPassword();
	const { register, handleSubmit, formState } = useForm();

	const { errors } = formState;
	function onSubmit(data) {
		sendForgotPassword(data.email, {
			onSuccess: () => {
				toast.success('Sprawdź swoją skrzynkę email!');
			},
			onError: (err) => {
				toast.error(err.message);
			},
		});
	}

	return (
		<LoginLayout>
			<Logo>
				<CompanyName $size='big'>
					Evaluate <LogoTextBottom>the book </LogoTextBottom>
				</CompanyName>
			</Logo>

			<Heading style={{ textAlign: 'center' }} as='h2'>
				Odzyskaj swoje hasło <span style={{ color: 'yellow' }}> 👇</span>
			</Heading>

			<Form onSubmit={handleSubmit(onSubmit)}>
				{isSuccess ? (
					<SuccesMessage style={{ fontSize: '4rem' }}>Sprawdź swoją skrzynkę email i kliknij w link w wiadomości!</SuccesMessage>
				) : (
					''
				)}
				{error ? <ErrorMessage>{error.message}</ErrorMessage> : ''}
				<LoginFormBox>
					<label htmlFor='email'>E-mail</label>
					<InputForm
						autoComplete='username'
						type='email'
						id='email'
						{...register('email', {
							required: 'Uzupłenij to pole!',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Nieprawidłowy adres e-mail',
							},
						})}
					/>
					<ErrorMessage>{errors?.email?.message}</ErrorMessage>
				</LoginFormBox>

				<LoginFormBox>
					<Button
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
						type='submit'
						$sizes='medium'
						$variations='primary'
					>
						{isPending ? <SpinnerMini /> : 'Wyślij'}
					</Button>
				</LoginFormBox>
				<LinksBox>
					<Link to='/login'>
						<Button style={{ padding: '0 0' }} type='submit' $sizes='medium' $variations='secondary'>
							Zaloguj się
						</Button>
					</Link>
					<Link to='/register'>
						<Button
							// disabled={isPending}
							style={{ padding: '0 0' }}
							type='submit'
							$sizes='medium'
							$variations='secondary'
						>
							Zarejestruj się
						</Button>
					</Link>
				</LinksBox>
			</Form>
		</LoginLayout>
	);
}

export default EmailVerify;
