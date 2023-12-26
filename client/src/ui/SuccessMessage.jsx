/* eslint-disable react/prop-types */
import styled from 'styled-components';

const SuccessMessageStyle = styled.p`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	font-weight: 500;
	font-size: 1.35rem;
	background-color: var(--green-600);
	background-color: var(--accent-200);
	background-color: var(--gray-200);
	color: #fff;
	color: var(--green-900);
	border-radius: var(--border-radius-sm);
`;

export default function SuccesMessage({ children }) {
	return <SuccessMessageStyle>{children}</SuccessMessageStyle>;
}
