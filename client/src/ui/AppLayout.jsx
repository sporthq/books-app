import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import Logo from '../ui/Logo';
import Footer from './Footer';
import { useState } from 'react';
import CompanyName from './CompanyName';
import LogoTextBottom from './LogoTextBottom';

const Main = styled.main`
	grid-column: 2/-1;
	min-height: 100vh;
`;

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 8vw 1fr 1fr auto;
`;

const Aside = styled.aside`
	padding: 2.55rem 0;
`;

export default function AppLayout() {
	const [query, setQuery] = useState('');
	return (
		<>
			<StyledAppLayout>
				<Aside>
					<Logo>
						<CompanyName>
							Bookings <br /> <LogoTextBottom>Rate</LogoTextBottom>
						</CompanyName>
					</Logo>
				</Aside>
				<Header setQuery={setQuery}></Header>
				<Main>{<Outlet context={[query, setQuery]} />}</Main>
				<Footer />
			</StyledAppLayout>
		</>
	);
}
