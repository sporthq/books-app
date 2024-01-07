import styled from 'styled-components';

const FooterStyled = styled.footer`
	grid-column: 2/-1;
	padding-top: 4.8rem;
	padding-bottom: 2.4rem;
	text-align: center;

	@media only screen and (max-width: 75em) {
		grid-column: 1/-1;
	}
`;
const TextColor = styled.span`
	color: var(--accent-200);
	font-weight: 500;
`;

export default function Footer() {
	return (
		<FooterStyled>
			{' '}
			&copy; {new Date().getFullYear()} Created by <TextColor>www.nowakart.pl 🪼</TextColor>
		</FooterStyled>
	);
}
