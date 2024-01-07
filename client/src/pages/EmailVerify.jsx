import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CompanyName from '../ui/CompanyName';
import Logo from '../ui/Logo';
import LogoTextBottom from '../ui/LogoTextBottom';
import Heading from './../ui/Heading';

import toast from 'react-hot-toast';
import MessageEmailVerify from '../ui/MessageEmailVerify';
import useVerifyEmail from './../features/authentication/useVerifyEmail';

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

function EmailVerify() {
	const { token } = useParams();
	const { verifyUserEmail, isPending, error } = useVerifyEmail();

	useEffect(() => {
		verifyUserEmail(token, {
			onSuccess: () => toast.success('Email został zweryfikowany'),
			onError: (err) => toast.error(err.message),
		});
	}, []);

	return (
		<LoginLayout>
			<Logo>
				<CompanyName>
					Bookings <LogoTextBottom>Rate </LogoTextBottom>
				</CompanyName>
			</Logo>

			<Heading style={{ textAlign: 'center' }} as='h2'>
				Werifkacja adresu email
			</Heading>

			<MessageEmailVerify isPending={isPending} error={error} />
		</LoginLayout>
	);
}

export default EmailVerify;
