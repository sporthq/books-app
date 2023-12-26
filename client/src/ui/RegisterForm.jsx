import { Link, redirect, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import LoginFormBox from './LoginFormBox';
import useRegister from '../features/authentication/useRegister';
import SpinnerMini from './SpinnrerMini';
import SuccesMessage from './SuccessMessage';
import { FaCheckCircle } from 'react-icons/fa';
const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	padding: 2.4rem 4rem;
	box-shadow: var(--shadow-md);
`;

const CheckIcon = styled(FaCheckCircle)`
	width: 1.8rem;
	height: 1.8rem;
	color: var(--green-900);
`;

const LinksBox = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const RegisterForm = () => {
	const { registerUser, isPending, error, isSuccess } = useRegister();
	const { register, handleSubmit, formState, getValues } = useForm();

	const { errors } = formState;
	console.log(errors);

	function onSubmit(data) {
		const { email, password } = data;

		registerUser({ email, password });
	}
	function onError(err) {
		console.log(err);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			{isSuccess ? (
				<SuccesMessage>
					<CheckIcon /> Konto zostało utworzone, sprawdź swoją pocztę bo dokończyć rejestrację.
				</SuccesMessage>
			) : (
				''
			)}
			{error ? <ErrorMessage>{error.message}</ErrorMessage> : ''}
			<LoginFormBox>
				<label htmlFor='email'>E-mail</label>
				<Input
					$breadth='full'
					autoComplete='username'
					id='email'
					type='email'
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
				<label htmlFor='password'>Hasło</label>
				<Input
					disabled={isPending}
					$breadth='full'
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
				<Input
					disabled={isPending}
					$breadth='full'
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
				<Button type='submit' $sizes='medium' $variations='primary'>
					{isPending ? <SpinnerMini /> : 'Załóż konto'}
				</Button>
			</LoginFormBox>
			<LinksBox>
				<Link to='/login'>
					<Button disabled={isPending} style={{ padding: '0 0' }} type='submit' $sizes='medium' $variations='secondary'>
						Masz konto? Zaloguj się
					</Button>
				</Link>
			</LinksBox>
		</Form>
	);
};

export default RegisterForm;
