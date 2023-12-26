/* eslint-disable react/prop-types */
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserPanel from './UserPanel';

const StyledHeader = styled.header`
	display: flex;
	grid-column: 2/-1;
	align-items: center;
	padding: 2.85rem 0 4.8rem;
`;

export default function Header( {setQuery} ) {
	return (
		<StyledHeader>
			<SearchBar setQuery={setQuery} />

			<UserPanel />
		</StyledHeader>
	);
}
