/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	font-size: 1.8rem;
	text-align: center;
	font-weight: 500;

	border: 1px solid var(--grey-600);
	padding: 3.2rem 0;
	box-shadow: var(--shadow-md);
`;

const ErrorMessageEmail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	color: red;
`;
const SuccesMessageEmail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	color: var(--green-900);
`;
const InfoMessageEmail = styled.p`
	color: var(--accent-200);
`;

function MessageEmailVerify({ error, isPending }) {
	return (
		<MessageBox>
			{isPending && <InfoMessageEmail>Sprawdzanie poprawności emaila...</InfoMessageEmail>}
			{error && (
				<ErrorMessageEmail>
					<p>{error.message}</p>
					<Link to='/login'>
						<Button $sizes='medium' $variations='primary'>
							Przejdź do logowania
						</Button>
					</Link>
				</ErrorMessageEmail>
			)}
			{!isPending && !error && (
				<SuccesMessageEmail>
					<p>Email został zweryfikowany. </p>
					<Link to='/login'>
						<Button $sizes='medium' $variations='primary'>
							Przejdź do logowania
						</Button>
					</Link>
				</SuccesMessageEmail>
			)}
		</MessageBox>
	);
}

export default MessageEmailVerify;
