import styled from 'styled-components';
// import LoginForm from './../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from './../ui/Heading';
import CompanyName from '../ui/CompanyName';
import LogoTextBottom from '../ui/LogoTextBottom';
import FormLogin from './../ui/FormLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

function Login() {
	const user = JSON.parse(localStorage.getItem('userInfo'));
	const navigate = useNavigate();

	useEffect(
		function () {
			if (user) {
				navigate('/');
			}
		},
		[navigate, user]
	);

	return (
		<LoginLayout>
			<Logo>
				<CompanyName $size='big'>
					Evaluate <LogoTextBottom>the book </LogoTextBottom>
				</CompanyName>
			</Logo>

			<Heading style={{ textAlign: 'center' }} as='h2'>
				Zaloguj się do swojego konta <span style={{ color: 'yellow' }}> 👇</span>
			</Heading>
			<FormLogin />
		</LoginLayout>
	);
}

export default Login;
