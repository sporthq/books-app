import { GoTrash } from 'react-icons/go';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetchUserReviews from '../features/authentication/useFetchUserReviews';
import useDeleteReview from '../features/reviews/useDeleteReview';
import BackToHome from '../ui/BackToHome';
import {
	BookAuthor,
	BookTitle,
	BoxImg,
	DataPublished,
	LazyLoadImageStyled,
	WithoutImg,
} from '../ui/CardBookComponents';
import ConfirmDelete from '../ui/ConfirmDelete';
import Heading from '../ui/Heading';
import Loader from '../ui/Loader';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';
import StarRating from '../ui/StarRating';
import { PAGE_SIZE_USER_REVIEW } from '../utils/constans';

const ReviewsUserList = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3.2rem;
	padding: 3.2rem 0;

	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;
const ReviewListItem = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	padding: 2.4rem;

	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-md);
	/* border: 1px solid var(--accent-150); */

	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: translateY(-2px);
	}
`;

const BookInfoBox = styled.div`
	display: flex;
	gap: 3.2rem;

	@media only screen and (max-width: 64em) {
		flex-direction: column;
	}
	@media only screen and (max-width: 48em) {
		flex-direction: row;
	}
	@media only screen and (max-width: 36em) {
		flex-direction: column;
	}
`;

const UserInfoAboutReview = styled.div`
	display: flex;
	flex-direction: column;
`;

const ContentReviewBox = styled.div``;
const ContentReview = styled.p`
	color: var(--text-200);
`;

const GoTrashStyled = styled(GoTrash)`
	position: absolute;
	right: 3.5%;
	top: 5%;
	font-size: 1.85rem;
	color: red;
	cursor: pointer;
`;
const UserProfile = () => {
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page');
	const { reviews, isLoading, error } = useFetchUserReviews();
	const { deleteReview, isPending } = useDeleteReview();
	const user = JSON.parse(localStorage.getItem('userInfo'));

	if (isLoading) return <Loader />;
	if (error) return <p>{error.message}</p>;
	const pageIsTooLarge = page > Math.ceil(reviews[0]?.amountReviews / PAGE_SIZE_USER_REVIEW);

	
	return (
		<div>
			<Heading as='h2'>
				{' '}
				{user?._id === reviews[0]?.userId ? 'Twoje recenzje' : 'Recenzje ' + reviews[0]?.userName}
			</Heading>
			<BackToHome />
			<ReviewsUserList>
				{reviews?.map((review) => {
					const { id, bookInfo, contentReview, rating } = review;
					if (bookInfo === null) return <p>Książka została usunięta z naszej bazdy danych</p>;
					const { title, author, image, publishedDate, _id } = bookInfo;

					return (
						<ReviewListItem key={id}>
							{user?._id === reviews[0].userId && (
								<Modal>
									<Modal.Open opens='delete'>
										<GoTrashStyled></GoTrashStyled>
									</Modal.Open>
									<Modal.Window name='delete'>
										<ConfirmDelete
											resourceName='recenzje'
											onConfirm={() => {
												const reviewId = id;
												const userId = user._id;
												deleteReview({ userId, reviewId });
											}}
											disabled={isPending}
										/>
									</Modal.Window>
								</Modal>
							)}
							<BookInfoBox>
								<Link to={'/books/' + _id}>
									{image ? (
										<BoxImg>
											<LazyLoadImageStyled
												height={170}
												width={120}
												effect='blur'
												loading='lazy'
												src={image}
												alt={`ksiązka ${title}`}
												placeholderSrc='https://placehold.co/120x170'
											></LazyLoadImageStyled>
										</BoxImg>
									) : (
										<WithoutImg>
											<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
										</WithoutImg>
									)}
								</Link>
								<UserInfoAboutReview>
									<BookTitle>{title}</BookTitle>
									<BookAuthor>{author}</BookAuthor>
									<StarRating
										defaultRating={rating}
										reviews={true}
										toFixed={true}
										color='var(--accent-150)'
										size='20'
										maxRating='6'
									></StarRating>
									<DataPublished style={{ paddingTop: '3.2rem' }}>{publishedDate}</DataPublished>
								</UserInfoAboutReview>
							</BookInfoBox>
							<ContentReviewBox>
								<ContentReview>{contentReview}</ContentReview>
							</ContentReviewBox>
						</ReviewListItem>
					);
				})}
			</ReviewsUserList>
			{reviews[0]?.amountReviews > 0 && !pageIsTooLarge ? (
				<Pagination count={reviews[0].amountReviews} pageSize={PAGE_SIZE_USER_REVIEW} />
			) : (
				<div>
					<p style={{ paddingBottom: '1.2rem' }}>Nie znaleziono recenzji.</p>
					{/* <ButtonStyled $variations='seconadry' $sizes='small' as={Link} to='/'>
						<BsArrowReturnLeft /> Wróc do strony głównej
					</ButtonStyled>{' '} */}
				</div>
			)}
		</div>
	);
};

export default UserProfile;
