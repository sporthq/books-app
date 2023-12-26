import styled, { css } from 'styled-components';

const CompanyName = styled.p`
	color: var(--text-100);
	
	font-size: 1.6rem;
	${(props) =>
		props.$size === 'big' &&
		css`
			font-size: 3rem;
			line-height: .75;
		`}
`;

export default CompanyName;
