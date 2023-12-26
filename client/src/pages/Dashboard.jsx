import { useOutletContext } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import BookItem, { TextBox } from '../features/books/BookItem';
import Heading from '../ui/Heading';
import { BookImg, BookAuthor, BookTitle, DataPublished } from '../features/books/BookItem';
import { useFetchBooks } from '../features/books/useFetchBooks';
import useSearchBoxFromApi from '../features/books/useSearchBoxFromApi';
import StarRating from '../ui/StarRating';
import Loader from '../ui/Loader';
import AddedBookListItem from '../features/books/AddedBookListItem.jsx';

const Box = styled.div`
	display: grid;
	grid-template-columns: 70% 35%;
	min-height: 80dvh;

	color: var(--text-100);
`;

const SearchListBox = styled.div`
	position: relative;
	height: auto;
`;

const BooksList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4.8rem;
`;

const SecondBox = styled.div`
	padding: 2.4rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;

	border-left: 1px solid var(--grey-300);
`;

const ThirdBox = styled.div`
	grid-column: 1/-1;
	margin-top: 7.2rem;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;

  }
  to {
    opacity: 1;
	
  }
`;

const LastAddedListUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2.4rem;
	padding: 2.4rem 0;
	animation: ${fadeIn} 0.5s ease-in-out;
`;

const RankingNumber = styled.span`
	position: absolute;
	right: 0;
	/* bottom: -2rem; */
	/* font-size: 6rem; */
	font-weight: bold;
	/* color: var(--accent-150); */

	// efect without fill
	bottom: -3rem;
	font-size: 7.5rem;
	-webkit-text-stroke: 1px var(--accent-150);
	font-family: sans-serif;
	color: transparent;
`;
export default function Dashboard() {
	const [query] = useOutletContext();
	const { isLoading, books, errFetchBooks } = useFetchBooks();
	const { data, loading, error } = useSearchBoxFromApi(query);
	console.log(data);

	return (
		<>
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
				<SecondBox>
					<Heading as='h2'>Top 3</Heading>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '3.2rem', marginTop: '2.4rem' }}>
						<div style={{ position: 'relative', display: 'flex', gap: '1.2rem' }}>
							<div style={{ width: '12rem', maxHeight: '17rem' }}>
								<BookImg src='one.jpg'></BookImg>
							</div>
							<RankingNumber>1</RankingNumber>

							<TextBox style={{ justifyContent: 'start' }}>
								<BookTitle>Ślepnąc od świateł</BookTitle>
								<BookAuthor>Jakub Żulczyk</BookAuthor>
								<StarRating color='var(--accent-150)' size='20' maxRating='6'></StarRating>
								<DataPublished>2020</DataPublished>
							</TextBox>
						</div>
						<div style={{ position: 'relative', display: 'flex', gap: '1.2rem' }}>
							<div style={{ width: '12rem', maxHeight: '17rem' }}>
								<BookImg style={{}} src='two.jpg'></BookImg>
							</div>
							<RankingNumber>2</RankingNumber>
							<TextBox style={{ justifyContent: 'start' }}>
								<BookTitle>Wotum nieufności</BookTitle>
								<BookAuthor>Remigusz Mroz</BookAuthor>
								<StarRating color='var(--accent-150)' size='20' maxRating='6'></StarRating>
								<DataPublished>2010</DataPublished>
							</TextBox>
						</div>
					</div>
				</SecondBox>
				<ThirdBox>
					<Heading as='h2'>Ostatnio dodane:</Heading>
					{isLoading && <Loader />}
					{errFetchBooks && <p>Coś poszło nie tak... 🤢</p>}
					{books?.length === 0 && <p>Dodaj pierwszą książkę 😀</p>}

					<LastAddedListUl>
						{Array.isArray(books) &&
							books
								.slice(-3)
								.reverse()
								.map((book) => <AddedBookListItem book={book} key={book._id}></AddedBookListItem>)}
					</LastAddedListUl>
				</ThirdBox>
			</Box>
		</>
	);
}
