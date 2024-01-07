/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useFetchBooks } from './useFetchBooks';
import { useAddNewBook } from './useAddNewBook';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnrerMini';

import {
	BookAuthor,
	BookTitle,
	DataPublished,
	TextBox,
	WithoutImg,
	LazyLoadImageStyled,
} from '../../ui/CardBookComponents';
const BookListItem = styled.li`
	display: flex;

	max-width: 350px;
	justify-self: start;

`;

export default function BookItem({ books }) {
	const { mutate, isPending } = useAddNewBook();
	const [addingIndex, setAddingIndex] = useState(null);
	const { books: booksList, error } = useFetchBooks();

	function handleAddBook(book, index) {
		const newBookData = {
			title: book?.title ? book?.title : '',
			author: book?.author_name ? book.author_name.slice(0, 4).join(', ') : 'Nieznany',
			publishedDate: Array.isArray(book?.publish_date) ? book?.publish_date?.[0] : 'Nieznana',
			image: book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg` : '',
			// reviews: {},
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
					<div>
						{book?.cover_i ? (
							<LazyLoadImageStyled
								src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`}
								height={170}
								width={120}
								effect='blur'
								alt={`Okładka książki ${book?.title}`}
								loading='lazy'
								placeholderSrc='https://placehold.co/120x170'
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
