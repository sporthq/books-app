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

	color: var(--text-100);

	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr;
	}
`;

const SearchListBox = styled.div`
	position: relative;
	height: auto;
`;

const BooksList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4.8rem;

	@media only screen and (max-width: 75em) {
		gap: 5.2rem;
		grid-template-columns: repeat(3, 1fr);
		padding-bottom: 6.2rem ;
	}

	@media only screen and (max-width: 63em) {
		gap: 5.2rem;
		grid-template-columns: repeat(2, 1fr);
		
		padding-bottom: 6.2rem ;
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
					<Loader style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50% )' }} />
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
