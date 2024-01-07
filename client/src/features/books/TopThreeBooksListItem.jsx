/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StarRating from '../../ui/StarRating';
import {
	AmountReview,
	BookAuthor,
	BookTitle,
	DataPublished,
	TextBox,
	WithoutImg,
	BoxImg,
	LazyLoadImageStyled,
} from '../../ui/CardBookComponents';

const RankingNumber = styled.span`
	position: absolute;
	right: 0;
	font-weight: bold;
	bottom: -3rem;
	font-size: 7.5rem;
	-webkit-text-stroke: 1px var(--accent-150);
	font-family: sans-serif;
	color: transparent;

	@media only screen and (max-width: 48em) {
		left: 0;
		bottom: -3rem;
		color: #fff;
		-webkit-text-stroke: 1.5px var(--accent-150);
		/* color: var(--accent-150);
		-webkit-text-stroke: 3px #fff; */
		box-shadow: var(--shadow-sm);

		@media only screen and (max-width: 23em) {
			top: 3.5rem;
			left: 17.5rem;
		}
	}
`;
const TopThreeLiList = styled.li`
	position: relative;
	display: flex;

	gap: 1.2rem;

	@media only screen and (max-width: 23em) {
		flex-direction: column;
	}
`;

const TopThreeBooksListItem = ({ book, index }) => {
	return (
		<TopThreeLiList>
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
						></LazyLoadImageStyled>
					</BoxImg>
				) : (
					<WithoutImg>
						<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
					</WithoutImg>
				)}
			</Link>
			<RankingNumber>{index + 1}</RankingNumber>

			<TextBox style={{ justifyContent: 'start' }}>
				<BookTitle>{book?.title}</BookTitle>
				<BookAuthor>{book?.author}</BookAuthor>
				<StarRating
					defaultRating={book?.rating}
					reviews={true}
					toFixed={true}
					color='var(--accent-150)'
					size='20'
					maxRating='6'
				></StarRating>
				<AmountReview>
					{book?.numOfReviews <= 0 ? 'Napisz recenzję!' : `Ilość recenzji: [${book?.numOfReviews}] `}
				</AmountReview>
				<DataPublished>{book?.publishedDate}</DataPublished>
			</TextBox>
		</TopThreeLiList>
	);
};

export default TopThreeBooksListItem;
