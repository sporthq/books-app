import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import BookItem from '../features/books/BookItem';
import LastedAdded from '../features/books/LastedAdded.jsx';
import TopThreeBox from '../features/books/TopThreeBox.jsx';
import useSearchBoxFromApi from '../features/books/useSearchBoxFromApi';
import Loader from '../ui/Loader';

const Box = styled.div`
	display: grid;
	grid-template-columns: 70% 35%;
	min-height: 80dvh;
	/* overflow: hidden; */

	color: var(--text-100);

	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr;
		padding-right: 0 4rem;
	}
`;

const SearchListBox = styled.div`
	position: relative;
	height: auto;
	padding-bottom: 1.2rem;
`;

const BooksList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	row-gap: 4.8rem;
	padding-right: 2.4rem;

	@media only screen and (max-width: 75em) {
		row-gap: 5.2rem;
		/* grid-template-columns: repeat(3, minmax(0,1fr)); */
		grid-template-columns: 1fr 1fr;

		padding-bottom: 6.2rem;
		padding-right: 0;
		grid-auto-flow: dense;
	}

	@media only screen and (max-width: 63em) {
		row-gap: 5.2rem;
		grid-template-columns: 1fr 1fr;

		padding-bottom: 6.2rem;
		justify-content: center;
	}

	// 768px
	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;

export default function Dashboard() {
	const [query] = useOutletContext();
	const { data, loading, error } = useSearchBoxFromApi(query);

	console.log(`query: ${query}`);
	return (
		<Box>
			<SearchListBox>
				{!query ? (
					<p>Szukaj ksiązki ⬆️</p>
				) : loading ? (
					<Loader style={{ position: 'absolute',padding: '2.4rem', left: '50%', top: '50%', transform: 'translate(-50%,-50% )' }} />
				) : error ? (
					<p>Wystąpił nieoczekiwany błąd</p>
				) : (
					<BooksList>
						<BookItem books={data} />
					</BooksList>
				)}
			</SearchListBox>
			<TopThreeBox />
			<LastedAdded />
		</Box>
	);
}
