/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useFetchBooks } from './useFetchBooks';
import { useAddNewBook } from './useAddNewBook';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnrerMini';

const BookListItem = styled.li`
	display: flex;
	justify-self: left;
`;

const BookImg = styled.img`
	/* min-width: 100%;
	height: 100%; */

	// changes
	width: 12rem;
	height: 17rem;
	object-fit: cover;
	opacity: 1;
	transition: opacity 0.3s ease-in-out, transform .3s ease-in-out;

	&:hover {
		transform: perspective(465px) rotateX(0) rotateY(-10deg);
		opacity: .8;
	}
`;
const WithoutImg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 17rem;
	width: 12rem;
	border: 2px solid var(--grey-600);
	border-radius: 4px;
`;
const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.35rem 0;
	gap: 0.25rem;
	max-height: 100%;
`;
const BookTitle = styled.p`
	font-size: 1.8rem;
`;
const BookAuthor = styled.p`
	color: var(--grey-600);
	font-weight: bold;
`;

const DataPublished = styled.p`
	align-self: start;
	margin-top: auto;
	font-size: 1.4rem;
`;
export default function BookItem({ books }) {
	const { mutate, isPending } = useAddNewBook();
	const [addingIndex, setAddingIndex] = useState(null);
	const { books: booksList, error } = useFetchBooks();

	
	function handleAddBook(book, index) {
		const newBookData = {
			title: book?.title ? book?.title : '',
			author: book?.author_name ? book.author_name.slice(0, 4).join(', ') : 'Nieznany',
			publishedDate: Array.isArray(book?.publish_date) ? book?.publish_date?.[0] : '',
			image: book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg` : '',
			reviews: {},
			numOfReviews: 0,
			rating: 0,
		};

		const isBookInDatabase = booksList.some((existingBook) => {
			return (
				existingBook.title === newBookData.title &&
				existingBook.author === newBookData.author &&
				existingBook.publishedDate === newBookData.publishedDate
			);
		});

		if (isBookInDatabase) {
			toast.error('Ta książka już jest w naszej bazie');
			return;
		}
		setAddingIndex(index);
		mutate(newBookData);
	}

	if (!books || !Array.isArray(books)) {
		return <p>Brak danych do wyświetlenia ❌</p>;
	}

	if (books.length === 0) {
		return <p>Brak książek do wyświetlenia ❌</p>;
	}

	if (books.length > 0)
		return books.slice(0, 6).map((book, index) => (
			<BookListItem key={index}>
				<div style={{ display: 'flex', gap: '1.2rem', maxHeight: '17rem' }}>
					{/* <div style={{ width: '12rem', height: 'auto' }}> */}
					<div>
						{book?.cover_i ? (
							<BookImg
								src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`}
								alt={`Okładka książki ${book?.title}`}
							/>
						) : (
							<WithoutImg>
								<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
							</WithoutImg>
						)}
					</div>
					<TextBox>
						<BookTitle>{book?.title.split(' ').slice(0, 6).join(' ')}</BookTitle>

						<BookAuthor>{book?.author_name?.slice(0, 4).join(', ')}</BookAuthor>
						<Button
							onClick={() => handleAddBook(book, index)}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								alignSelf: 'start',
								marginTop: '.5rem',
								minWidth: '5rem',
							}}
							$sizes='small'
							$variations='primary'
						>
							<a href=''></a>

							{index === addingIndex && isPending ? <SpinnerMini /> : 'Dodaj'}
						</Button>
						<DataPublished>{book?.publish_date?.[0]}</DataPublished>
					</TextBox>
				</div>
			</BookListItem>
		));
}

export { BookImg, BookAuthor, BookTitle, DataPublished, TextBox, WithoutImg };
