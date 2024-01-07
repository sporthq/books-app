import styled from 'styled-components';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { useFetchBooks } from '../features/books/useFetchBooks';
import {
	BookAuthor,
	BookTitle,
	DataPublished,
	TextBox,
	WithoutImg,
	BoxImg,
	AmountReview,
	LazyLoadImageStyled,
} from '../ui/CardBookComponents';
import StarRating from '../ui/StarRating';
import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import { PAGE_SIZE_ALL_BOOKS } from '../utils/constans';
import BackToHome from '../ui/BackToHome';

const BooksList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4.8rem;
	padding: 2.4rem 0;

	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;
const BookListItem = styled.li`
	display: flex;
	gap: 2.4rem;
`;
const StyledBoxLinkStar = styled.div`
	margin-top: auto;
`;

const AllBooks = () => {
	const { books = [], isLoading, error } = useFetchBooks(); // Poprawione z booksList na books
	const [searchParams] = useSearchParams();
	const [query] = useOutletContext();

	if (isLoading) return <Loader />;
	if (error) return <p>Wystąpił błąd</p>;

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
	const reversedBooks = [...books]?.reverse();

	const pageIsTooLarge = page > Math.ceil(books?.length / PAGE_SIZE_ALL_BOOKS);

	const filteredBooks = reversedBooks
		?.filter(
			(book) =>
				book.title.toLowerCase().includes(query.toLowerCase()) ||
				book.author.toLowerCase().includes(query.toLowerCase())
		)
		.slice();
	return (
		<>
			<BackToHome />
			<BooksList>
				{query
					? filteredBooks.map((book) => (
							<BookListItem key={book._id}>
								{' '}
								{/* Dodane key */}
								<Link to={`/books/${book._id}`}>
									{book?.image ? (
										<BoxImg>
											<LazyLoadImageStyled
												height={170}
												width={120}
												effect='blur'
												src={book?.image}
												alt={`ksiązka ${book?.title}`}
												placeholderSrc='https://placehold.co/120x170'
											></LazyLoadImageStyled>{' '}
											{/* Dodane alt dla dostępności */}
										</BoxImg>
									) : (
										<WithoutImg>
											<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
										</WithoutImg>
									)}
								</Link>
								<TextBox>
									<BookTitle>{book?.title}</BookTitle>
									<BookAuthor>{book?.author}</BookAuthor>
									<StyledBoxLinkStar>
										<Link to={`/books/${book._id}`}>
											<StarRating
												defaultRating={book?.rating}
												reviews={true}
												toFixed={true}
												color='var(--accent-150)'
												size='21'
												maxRating='6'
											/>
											<AmountReview>
												{book?.numOfReviews <= 0 ? 'Napisz recenzję!' : `Ilość recenzji: [${book?.numOfReviews}] `}
											</AmountReview>
										</Link>
									</StyledBoxLinkStar>
									<DataPublished>{book?.publishedDate}</DataPublished>
								</TextBox>
							</BookListItem>
					  ))
					: reversedBooks
							?.slice((page - 1) * PAGE_SIZE_ALL_BOOKS, page * PAGE_SIZE_ALL_BOOKS)

							.map((book) => (
								<BookListItem key={book._id}>
									<Link to={`/books/${book._id}`}>
										{book?.image ? (
											<BoxImg>
												<LazyLoadImageStyled
													height={170}
													width={120}
													loading='lazy'
													effect='blur'
													src={book?.image}
													alt={`ksiązka ${book?.title}`}
													placeholderSrc='https://placehold.co/120x170'
												></LazyLoadImageStyled>
											</BoxImg>
										) : (
											<WithoutImg>
												<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
											</WithoutImg>
										)}
									</Link>
									<TextBox>
										<BookTitle>{book?.title}</BookTitle>
										<BookAuthor>{book?.author}</BookAuthor>
										<StyledBoxLinkStar>
											<Link to={`/books/${book._id}`}>
												<StarRating
													defaultRating={book?.rating}
													reviews={true}
													toFixed={true}
													color='var(--accent-150)'
													size='21'
													maxRating='6'
												/>
												<AmountReview>
													{book?.numOfReviews <= 0 ? 'Napisz recenzję!' : `Ilość recenzji: [${book?.numOfReviews}] `}
												</AmountReview>
											</Link>
										</StyledBoxLinkStar>
										<DataPublished>{book?.publishedDate}</DataPublished>
									</TextBox>
								</BookListItem>
							))}
			</BooksList>

			{books?.length > 0 && !pageIsTooLarge && filteredBooks?.length > 0 ? (
				<Pagination
					count={query ? filteredBooks?.length : books?.length}
					pageSize={query ? filteredBooks.length : PAGE_SIZE_ALL_BOOKS}
				/>
			) : (
				<>
					<p>Nic nie znaleźliśmy...</p>
					{/* <BackToHome /> */}
				</>
			)}
		</>
	);
};

export default AllBooks;
