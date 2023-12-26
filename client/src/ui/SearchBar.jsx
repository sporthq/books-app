/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Input from './Input';
import { CiSearch } from 'react-icons/ci';

const BoxSearchBar = styled.div`
	flex-grow: 1;
`;

const IconSearch = styled(CiSearch)`
	transform: translate(-3rem, 0.25rem);
	fill: var(--accent-200);
`;

export default function SearchBar({ setQuery }) {
	return (
		<BoxSearchBar>
			<Input onChange={(e) => setQuery(e.target.value)} placeholder='Szukaj książki...' />
			<IconSearch />
		</BoxSearchBar>
	);
}
