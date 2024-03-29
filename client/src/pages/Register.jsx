import styled from 'styled-components';
// import LoginForm from './../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from './../ui/Heading';
import CompanyName from '../ui/CompanyName';
import LogoTextBottom from '../ui/LogoTextBottom';
import RegisterForm from './../ui/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginLayout = styled.main`
	display: grid;
	align-content: center;
	justify-content: center;
	grid-template-columns: 48rem;
	min-height: 100vh;
	gap: 3.2rem;
	padding: 4rem 0;

	/* 576px */
	@media only screen and (max-width: 36em) {
		grid-template-columns: 43rem;
	}
`;

function Register() {
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
				Załóż konto w Evaluate the book <span style={{ color: 'yellow' }}> 👇</span>
			</Heading>
			<RegisterForm />
		</LoginLayout>
	);
}

export default Register;
