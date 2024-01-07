import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

import useResetPassword from '../features/authentication/useResetPassword';
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

function ResetPassword() {
	const { register, handleSubmit, formState, getValues } = useForm({});
	const { resetUserPassword, isPending, isSuccess, error, data } = useResetPassword();

	const { token } = useParams();

	const { errors } = formState;
	function onSubmit(data) {
		const { password } = data;
		resetUserPassword(
			{ password, token },
			{
				onSuccess: () => {
					toast.success('Hasło zmienione!');
				},
				onError: (error) => {
					toast.error(error.message);
				},
			}
		);
	}

	return (
		<LoginLayout>
			<Logo>
				<CompanyName $size='big'>
					Bookings <LogoTextBottom>Rate </LogoTextBottom>
				</CompanyName>
			</Logo>

			<Heading style={{ textAlign: 'center' }} as='h2'>
				Zmień swoje hasło 👇
			</Heading>

			<Form onSubmit={handleSubmit(onSubmit)}>
				{isSuccess ? <SuccesMessage style={{ fontSize: '4rem' }}>{data.message}</SuccesMessage> : ''}
				{error ? <ErrorMessage>{error.message}</ErrorMessage> : ''}
				<LoginFormBox>
					<label htmlFor='password'>Hasło</label>
					<InputForm
						disabled={isPending}
						type='password'
						id='password'
						{...register('password', {
							required: 'Uzupełnij to pole!',
							minLength: {
								value: 4,
								message: 'Hasło musi mieć co najmniej 4 znaki',
							},
						})}
					/>
					<ErrorMessage>{errors?.password?.message}</ErrorMessage>
				</LoginFormBox>
				<LoginFormBox>
					<label htmlFor='confirmPassword'>Powtórz hasło</label>
					<InputForm
						disabled={isPending}
						type='password'
						id='confirmPassword'
						{...register('confirmPassword', {
							required: 'Uzupełnij to pole!',
							validate: (value) => value === getValues().password || 'Hasła muszą być takie same',
						})}
					/>
					<ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
				</LoginFormBox>

				<LoginFormBox>
					<Button
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
						type='submit'
						$sizes='medium'
						$variations='primary'
						disabled={isPending}
					>
						{isPending ? <SpinnerMini /> : 'Zmień hasło'}
					</Button>
				</LoginFormBox>
				<LinksBox>
					<Link to='/login'>
						<Button style={{ padding: '0 0' }} type='submit' $sizes='medium' $variations='secondary'>
							Zaloguj się
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
		</LoginLayout>
	);
}

export default ResetPassword;
