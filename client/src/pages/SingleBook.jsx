import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Reviews from '../features/reviews/Reviews';
import { useAddReview } from '../features/reviews/useAddReview';
import { getAllReviews } from '../services/books/apiBooks';
import BackToHome from '../ui/BackToHome';
import Button from '../ui/Button';
import {
	BookAuthor,
	BookTitle,
	DataPublished,
	LazyLoadImageStyled,
	TextBox,
	WithoutImg,
} from '../ui/CardBookComponents';
import ErrorMessage from '../ui/ErrorMessage';
import Form from '../ui/Form';
import Heading from '../ui/Heading';
import InputForm from '../ui/InputForm';
import Loader from '../ui/Loader';
import SpinnerMini from '../ui/SpinnrerMini';
import StarRating from '../ui/StarRating';
import TextArea from '../ui/TextArea';
import { useFetchSingleBook } from './../features/books/useFetchSignleBook';

const fadeIn = keyframes`
  from {
    opacity: 0;

  }
  to {
    opacity: 1;
	
  }
`;
const SingleBookContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	/* grid-template-rows: auto auto; */

	grid-auto-rows: minmax(auto, auto);
	grid-gap: 6.4rem;

	/* 1024px */
	@media only screen and (max-width: 64em) {
		grid-template-columns: 1fr;
	}
`;

const WriteReviewBox = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 1/2;
	grid-row: 2;

	@media only screen and (max-width: 64em) {
		grid-row: 3;
	}
`;

const SingleBookBox = styled.div`
	grid-column: 1/2;
	grid-row: 1;
	display: flex;
	align-self: start;
	gap: 2.4rem;
	animation: ${fadeIn} 0.5s ease-in-out;

	@media only screen and (max-width: 36em) {
		flex-direction: column;
		
	}
`;
const BoxImage = styled.div`
	/* width: 12rem; */
	max-height: 30rem;

`;

const BookImgSingle = styled(LazyLoadImageStyled)`
	height: 30rem;
	width: auto;

	
`;
const WithoutImgSingle = styled(WithoutImg)`
	height: 30rem;
	width: 20rem;
`;
const BookTitleSingle = styled(BookTitle)`
	font-size: 2.4rem;
	-webkit-line-clamp: 4;
`;
const BookAuthorSingle = styled(BookAuthor)`
	font-size: 2rem;
	-webkit-line-clamp: 3;
`;
const DataPublishedSingle = styled(DataPublished)`
	font-size: 1.55rem;
`;

const AmountReview = styled.p`
	padding: 0.25rem 0;
	font-size: 1.35rem;
	color: var(--grey-600);
	font-weight: 500;
`;

export default function SingleBook() {
	const { bookId } = useParams();
	const [rating, setRating] = useState('');
	const ref = useRef();

	const [contentReview, setContentReview] = useState('');

	const user = JSON.parse(localStorage.getItem('userInfo'));

	const { singleBook, isLoading, error } = useFetchSingleBook();
	const { addReview, isPending, errorAddReview } = useAddReview();

	const userLeaveReview = singleBook?.reviews?.some((review) => review.user === user?._id);

	if (isLoading) return <Loader />;

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!singleBook) {
		return <p>Nie ma takiej książki ❌</p>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user) {
			const { _id: id } = user;

			if (!contentReview || !rating) {
				toast.error('Przyznaj ilość gwiazdek');
				return;
			}

			addReview({ bookId, id, contentReview, rating });
			setContentReview('');
			setRating('');
		} else {
			toast.error('Musisz być zalogowany, aby dodawac recenzje');
		}
	};
	const data = getAllReviews(bookId);
	console.log(data);
	return (
		<>
			<SingleBookContainer>
				<SingleBookBox>
					<div>
						{singleBook?.image ? (
							<BoxImage>
								<BookImgSingle
									height={300}
									loading='lazy'
									effect='blur'
									src={singleBook?.image}
									alt={`ksiązka ${singleBook?.title}`}
									placeholderSrc='https://placehold.co/120x170'
								></BookImgSingle>
							</BoxImage>
						) : (
							<WithoutImgSingle>
								<p style={{ fontSize: '1.2rem', padding: '0 1rem', color: 'var(--grey-900)' }}>Brak okładki</p>
							</WithoutImgSingle>
						)}
					</div>

					<TextBox>
						<BookTitleSingle>{singleBook?.title?.split(' ').slice(0, 10).join(' ')}</BookTitleSingle>

						<BookAuthorSingle>{singleBook?.author}</BookAuthorSingle>
						<StarRating
							defaultRating={singleBook?.rating}
							reviews={true}
							color='var(--accent-150)'
							size='30'
							maxRating='6'
							toFixed={true}
						></StarRating>

						<AmountReview
							onClick={() => {
								ref.current.scrollIntoView({ behavior: 'smooth' });
								ref.current.focus();
							}}
						>
							{singleBook?.numOfReviews <= 0 ? 'Napisz recenzję!' : `Ilość recenzji: [${singleBook?.numOfReviews}] `}
						</AmountReview>
						<DataPublishedSingle>{singleBook?.publishedDate}</DataPublishedSingle>
					</TextBox>
				</SingleBookBox>
				<WriteReviewBox>
					<Heading as='h2'>Napisz, co myślisz o tej książce:</Heading>
					<Form onSubmit={handleSubmit} $type='review'>
						<label style={{ color: 'var(--text-200)' }} htmlFor='username'>
							Nick
						</label>
						<InputForm
							disabled={isPending || !user || userLeaveReview}
							autoComplete='username'
							type='text'
							id='username'
							value={user?.name}
							readOnly
						/>
						<label style={{ color: 'var(--text-200)' }} htmlFor='username'>
							Treść recencji:
						</label>

						{/* // todo zmien htmlFor dla tego textArea */}
						<TextArea
							ref={ref}
							disabled={isPending || !user || userLeaveReview}
							required
							onChange={(e) => setContentReview(e.target.value)}
							value={contentReview}
						></TextArea>
						<div>
							{user ? (
								userLeaveReview ? (
									<ErrorMessage>Już oceniłeś tę książkę</ErrorMessage>
								) : (
									<StarRating
										readOnly={false} // Ustawienie readOnly na false pozwala użytkownikowi na edycję oceny
										onSetRating={setRating}
										color='var(--accent-150)'
										size='22'
										maxRating='6'
									></StarRating>
								)
							) : (
								<ErrorMessage>Musisz być zalogowany, żeby dać ocenę.</ErrorMessage>
							)}
						</div>

						<Button
							style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.75rem' }}
							$sizes='medium'
							$variations='primary'
							type='submit'
							disabled={isPending || !user || userLeaveReview}
						>
							{isPending ? <SpinnerMini /> : 'Wyślij'}
						</Button>
					</Form>
					<BackToHome />
				</WriteReviewBox>
				<Reviews singleBook={singleBook} />
			</SingleBookContainer>
		</>
	);
}
