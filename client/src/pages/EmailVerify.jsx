import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '../ui/Logo';
import Heading from './../ui/Heading';
import CompanyName from '../ui/CompanyName';
import LogoTextBottom from '../ui/LogoTextBottom';

import toast from 'react-hot-toast';
import useVerifyEmail from './../features/authentication/useVerifyEmail';
import MessageEmailVerify from '../ui/MessageEmailVerify';

const LoginLayout = styled.main`
	display: grid;
	align-content: center;
	justify-content: center;
	grid-template-columns: 48rem;
	min-height: 100vh;

	gap: 3.2rem;
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
				<CompanyName $size='big'>
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
