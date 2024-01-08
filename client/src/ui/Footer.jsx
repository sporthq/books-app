import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterStyled = styled.footer`
	display: flex;
	
	justify-content: center;
	gap: 0.45rem;
	grid-column: 2/-1;
	padding-top: 4.8rem;
	padding-bottom: 2.4rem;
	text-align: center;
	/* font-size: 1.25rem; */
	@media only screen and (max-width: 75em) {
		grid-column: 1/-1;
	}

	@media only screen and (max-width: 28em){
		flex-direction: column;
	}
`;
const TextColor = styled(Link)`
	color: var(--accent-200);
	font-weight: 500;
`;

export default function Footer() {
	return (
		<FooterStyled>
			&copy; {new Date().getFullYear()} Created by{' '}
			<TextColor to={'https://www.nowakart.pl'}>www.nowakart.pl 🪼</TextColor>
		</FooterStyled>
	);
}
