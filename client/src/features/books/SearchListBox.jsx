import styled from 'styled-components';
import BookItem from '../../features/books/BookItem';
import { useOutletContext } from 'react-router-dom';
import useSearchBoxFromApi from './useSearchBoxFromApi';
import Loader from '../../ui/Loader';

const SearchListBoxStyled = styled.div`
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
const SearchListBox = () => {
    const [query] = useOutletContext();
		const { data, loading, error } = useSearchBoxFromApi(query);
	return (
		<SearchListBoxStyled>
			{!query ? (
				<p>Szukaj ksiązki ⬆️</p>
			) : loading ? (
				<div style={{ padding: '2.4rem 0' }}>
					<Loader
						style={{
							position: 'absolute',
							padding: '2.4rem',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%,-50% )',
						}}
					/>
				</div>
			) : error ? (
				<p>Wystąpił nieoczekiwany błąd</p>
			) : (
				<BooksList>
					<BookItem books={data} />
				</BooksList>
			)}
		</SearchListBoxStyled>
	);
};

export default SearchListBox;
