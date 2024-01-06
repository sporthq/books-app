/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Input from './Input';
import { CiSearch } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const BoxSearchBar = styled.div`
	flex-grow: 1;
`;

const IconSearch = styled(CiSearch)`
	transform: translate(-3rem, 0.25rem);
	fill: var(--accent-200);
`;

export default function SearchBar({ setQuery, query }) {
	const { pathname } = useLocation();
	const isHomePage = pathname === '/' || pathname === '/dashboard' || pathname === '/all-books';

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		if (!isHomePage) {
			setQuery('');
		}
	}, [isHomePage, setQuery]);
	useEffect(() => {
		setQuery('');
	}, [pathname, setQuery]);

	return (
		<BoxSearchBar>
			<Input disabled={!isHomePage} value={query} onChange={(e) => handleChange(e)} placeholder='Szukaj książki...' />
			<IconSearch />
		</BoxSearchBar>
	);
}
