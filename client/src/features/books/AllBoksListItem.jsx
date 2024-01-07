/* eslint-disable react/prop-types */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
	BookAuthor,
	BookTitle,
	DataPublished,
	TextBox,
	WithoutImg,
	BoxImg,
	AmountReview,
	LazyLoadImageStyled,
} from '../../ui/CardBookComponents';
import StarRating from '../../ui/StarRating';

const BookListItem = styled.li`
	display: flex;
	gap: 2.4rem;
`;
const StyledBoxLinkStar = styled.div`
	margin-top: auto;
`;

const AllBoksListItem = ({ book }) => {
	return (
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
	);
};

export default AllBoksListItem;
