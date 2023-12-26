/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

import { BookImg, BookAuthor, BookTitle, DataPublished, WithoutImg } from '../../features/books/BookItem';
import { TextBox } from './BookItem';
import StarRating from '../../ui/StarRating';

const fadeIn = keyframes`
  from {
    opacity: 0;

  }
  to {
    opacity: 1;
	
  }
`;

const BoxImage = styled.div`
	width: 12rem;
	max-height: 17rem;
`;

const BookListItem = styled.li`
	display: flex;
	align-self: center;
	gap: 1.2rem;
	animation: ${fadeIn} 0.5s ease-in-out;
`;

export default function AddedBookListItem({ book }) {
	return (
		<BookListItem>
			<Link to={`/books/${book._id}`}>
				{book?.image ? (
					<BoxImage>
						<BookImg src={book?.image}></BookImg>
					</BoxImage>
				) : (
					<WithoutImg>
						<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
					</WithoutImg>
				)}
			</Link>

			<TextBox style={{ justifyContent: '' }}>
				<BookTitle>{book?.title}</BookTitle>
				<BookAuthor>{book?.author}</BookAuthor>
				<StarRating color='var(--accent-150)' size='20' maxRating='6'></StarRating>
				<DataPublished>{book?.publishedDate}</DataPublished>
			</TextBox>
		</BookListItem>
	);
}
