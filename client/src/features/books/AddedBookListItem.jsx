/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

import {
	
	BookAuthor,
	BookTitle,
	DataPublished,
	WithoutImg,
	TextBox,
	AmountReview,
	LazyLoadImageStyled,
} from '../../ui/CardBookComponents';

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

const StyledBoxLinkStar = styled.div`
	margin-top: auto;
`;

export default function AddedBookListItem({ book }) {
	return (
		<BookListItem>
			<Link to={`/books/${book._id}`}>
				{book?.image ? (
					<BoxImage>
						<LazyLoadImageStyled
							height={170}
							width={120}
							effect='blur'
							loading='lazy'
							src={book?.image}
							alt={`ksiązka ${book?.title}`}
							placeholderSrc='https://placehold.co/120x170'
						></LazyLoadImageStyled>
					</BoxImage>
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
						{console.log(book?.rating)}
						<StarRating
							defaultRating={book?.rating}
							reviews={true}
							toFixed={true}
							color='var(--accent-150)'
							size='21'
							maxRating='6'
						></StarRating>
						<AmountReview>
							{book?.numOfReviews <= 0 ? 'Napisz recenzję!' : `Ilość recenzji: [${book?.numOfReviews}] `}
						</AmountReview>
					</Link>
				</StyledBoxLinkStar>
				<DataPublished>{book?.publishedDate}</DataPublished>
			</TextBox>
		</BookListItem>
	);
}
