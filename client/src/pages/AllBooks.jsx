import styled from 'styled-components';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { useFetchBooks } from '../features/books/useFetchBooks';

import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import BackToHome from '../ui/BackToHome';
import { PAGE_SIZE_ALL_BOOKS } from '../utils/constans';
import AllBoksListItem from '../features/books/AllBoksListItem';

const BooksList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4.8rem;
	padding: 2.4rem 0;

	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;

const AllBooks = () => {
	const { books = [], isLoading, error } = useFetchBooks();
	const [searchParams] = useSearchParams();
	const [query] = useOutletContext();

	if (isLoading) return <Loader />;
	if (error) return <p>Wystąpił błąd, spróbuj ponownie</p>;

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
					? filteredBooks.map((book) => <AllBoksListItem key={book._id} book={book} />)
					: reversedBooks
							?.slice((page - 1) * PAGE_SIZE_ALL_BOOKS, page * PAGE_SIZE_ALL_BOOKS)

							.map((book) => <AllBoksListItem key={book._id} book={book} />)}
			</BooksList>

			{books?.length > 0 && !pageIsTooLarge && filteredBooks?.length > 0 ? (
				<Pagination
					count={query ? filteredBooks?.length : books?.length}
					pageSize={query ? filteredBooks.length : PAGE_SIZE_ALL_BOOKS}
				/>
			) : (
				<>
					<p>Nie ma takiej ksiązki w naszej bazie</p>
				</>
			)}
		</>
	);
};

export default AllBooks;
