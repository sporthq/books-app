import styled, { css } from 'styled-components';

const Heading = styled.h1`
	line-height: 1.5;

	// todo test
	background-image: linear-gradient(to right, #00668c, #5eacd3);
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
	${(props) =>
		props.as === 'h1' &&
		css`
			font-size: 3rem;
			font-weight: 600;
			margin-bottom: 3.2rem;
		`}

	${(props) =>
		props.as === 'h2' &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}
    ${(props) =>
		props.as === 'h3' &&
		css`
			font-size: 1rem;
			font-weight: 500;
		`}
		${(props) =>
		props.as === 'h4' &&
		css`
			font-size: 3rem;
			font-weight: 600;
			text-align: center;
		`}
	${(props) =>
		props.gradient === 'false' &&
		css`
			color: var(--accent-200);
			background-image: none;
		`}
`;

export default Heading;
