import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import Logo from '../ui/Logo';
import Footer from './Footer';
import { useState } from 'react';
import CompanyName from './CompanyName';
import LogoTextBottom from './LogoTextBottom';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 8vw 1fr 1fr auto;

	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr 1fr auto;
		
	}
	@media only screen and (max-width: 63em) {
		grid-template-columns: 1fr 1fr;
	}
	`;
const Main = styled.main`
	grid-column: 2/-1;
	min-height: 80dvh;
	

	@media only screen and (max-width: 75em) {
		grid-column: 1/-1;
	}
`;
const Aside = styled.aside`
	padding: 2.55rem 0;

	@media only screen and (max-width: 75em) {
		grid-column: 1/-1;
		padding-bottom: 0;
	}
`;

const BrStyled = styled.br`
	@media only screen and (max-width: 75em) {
		display: none;
	}
`;

export default function AppLayout() {
	const [query, setQuery] = useState('');
	return (
		<>
			<StyledAppLayout>
				<Aside>
					<Logo>
						<CompanyName>
							Bookings <BrStyled /> <LogoTextBottom>Rate</LogoTextBottom>
						</CompanyName>
					</Logo>
				</Aside>
				<Header setQuery={setQuery} query={query}></Header>
				<Main>{<Outlet context={[query, setQuery]} />}</Main>
				<Footer />
			</StyledAppLayout>
		</>
	);
}
