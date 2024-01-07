import styled, { css } from 'styled-components';

const CompanyName = styled.p`
	color: var(--text-100);

	font-size: 1.6rem;
	${(props) =>
		props.$size === 'big' &&
		css`
			font-size: 3rem;
			line-height: 0.75;
		`}

	// 768px
	@media only screen and (max-width: 75em) {
		font-size: 3.2rem
	}
	@media only screen and (max-width: 48em) {
		font-size: 2.4rem
	}
	// 576px
	@media only screen and (max-width: 36em) {
	}
`;

export default CompanyName;
