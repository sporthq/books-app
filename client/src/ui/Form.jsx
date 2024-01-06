import styled, { css } from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;

	gap: 2.4rem;
	padding: 2.4rem 4rem;
	box-shadow: var(--shadow-md);
	${(props) =>
		props.$type === 'review' &&
		css`
			padding: 2.4rem 0;
			max-width: 90%;
			gap: 1.6rem;
			box-shadow: none;
		`}
`;

export default Form;
