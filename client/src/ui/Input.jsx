import styled, { css } from 'styled-components';

const Input = styled.input`
	position: relative;
	padding: 0.8rem 1.2rem;
	font-family: inherit;
	background-color: var(--bg-100);
	border: 1px solid var(--accent-200);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	width: 30%;
	transition: transform 0.3s;

	&:focus {
		outline: 1px solid var(--accent-200);

		transform: translateY(-0.1rem);
	}

	// 768px
	@media only screen and (max-width: 48em) {
		width: 35%;
	}
	// 576px
	@media only screen and (max-width: 36em) {
		width: 45%;
	}
	// 480
	@media only screen and (max-width: 30em) {
		width: 55%;
	}
	${(props) =>
		props.$breadth === 'full' &&
		css`
			width: 100%;
		`}
`;

export default Input;
