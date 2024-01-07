/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import Pagination from '../../ui/Pagination';
import StarRating from '../../ui/StarRating';
import { BookAuthor } from '../../ui/CardBookComponents';
import useFetchReviews from './useFetchReviews';

import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { changeDate } from '../../utils/changeDate';
import { PAGE_SIZE } from '../../utils/constans';

const ReviewsBox = styled.div`
	grid-column: 2/-1;
	grid-row: 1/4;
	overflow-y: hidden;

	@media only screen and (max-width: 64em) {
		grid-column: 1/2;
		grid-row: 2;
	}
`;

const ReviewListUl = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;
const ReviewList = styled.li`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	padding: 2.4rem 0;
	border-bottom: 1px solid var(--grey-600);
	&:last-child {
		border-bottom: none;
	}
`;

const AuthorData = styled.div`
	display: flex;
	justify-content: space-between;
`;

const BookAuthorSingle = styled(BookAuthor)`
	font-size: 2rem;
`;

const ReviewText = styled.p`
	font-size: 1.6rem;
	color: var(--text-200);
`;

function Reviews({ singleBook }) {
	const { reviews, isLoading } = useFetchReviews();
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page');

	const pageIsTooLarge = page > Math.ceil(singleBook?.reviews?.length / PAGE_SIZE);

	return (
		<ReviewsBox>
			<Heading as='h2'>Ostatnie recenzje:</Heading>
			{isLoading ? (
				<Loader></Loader>
			) : (
				<ReviewListUl>
					{Array.isArray(reviews) &&
						reviews
							// .slice(0,3)
							// .slice(0,3)
							.reverse()
							.map((review) => {
								return (
									<ReviewList key={review?._id}>
										<AuthorData>
											<Link to={`/user-profile/${review?.user}`}>
												<BookAuthorSingle>{review?.name}</BookAuthorSingle>
											</Link>
											<StarRating reviews={review} color='var(--accent-150)' size='20' maxRating='6'></StarRating>
										</AuthorData>
										<ReviewText>{review?.contentReview}</ReviewText>
										<p
											style={{
												textAlign: 'right',
												fontSize: '1.2rem',
												color: 'var(--grey-900)',
												marginTop: '-1.5rem',
											}}
										>
											{changeDate(review?.createdAt)}
										</p>
									</ReviewList>
								);
							})}
				</ReviewListUl>
			)}
			{singleBook?.reviews?.length > 0 && !pageIsTooLarge ? (
				<Pagination count={singleBook?.reviews?.length} pageSize={PAGE_SIZE} />
			) : (
				<p>Nie znaleziono recenzji</p>
			)}
			{/* {pageIsTooLarge && <p>Strona nie istnieje</p>} */}
		</ReviewsBox>
	);
}

export default Reviews;
