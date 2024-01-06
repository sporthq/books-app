/* eslint-disable react/prop-types */
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserPanel from './UserPanel';

const StyledHeader = styled.header`
	display: flex;
	grid-column: 2/-1;
	align-items: center;
	padding: 2.85rem 0 4.2rem;

	@media only screen and (max-width: 75em) {
		grid-column: 1/-1;
	}
`;

export default function Header({ setQuery, query }) {
	return (
		<StyledHeader>
			<SearchBar setQuery={setQuery} query={query} />

			<UserPanel />
		</StyledHeader>
	);
}
