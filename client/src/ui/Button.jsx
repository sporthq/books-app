import styled, { css } from 'styled-components';

const sizes = {
	small: css`
		text-align: center;
		padding: 0.4rem 0.8rem;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
	`,
	medium: css`
		padding: 1.2rem 1.6rem;
		font-size: 1.4rem;
		font-weight: 500;
	`,
	large: css`
		padding: 1.2rem 2.4rem;
		font-size: 1.6rem;
		font-weight: 500;
	`,
};

const variations = {
	primary: css`
		color: #fff;
		background-color: var(--accent-200);

		&:hover {
			background-color: var(--accent-150);
		}
	`,
	secondary: css`
		color: var(--text-100);
		background-color: var(--color-grey-50);

		&:hover {
			text-decoration: underline;
		}
	`,
	tertiary: css`
		background-color: none;
		background-color: var(--color-grey-50);
		border: 1px solid var(--accent-200);

		&:hover {
			background-color: var(--grey-0);
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-700);

		&:hover {
			background-color: var(--color-red-800);
		}
	`,
};
const Button = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);

	${(props) => sizes[props.$sizes]}
	${(props) => variations[props.$variations]}
`;

export default Button;
