import styled from 'styled-components';
import Heading from '../../ui/Heading';
import SpinnerMini from '../../ui/SpinnrerMini';
import TopThreeBooksListItem from './TopThreeBooksListItem';
import { useFetchBooks } from './useFetchBooks';
import { calculateSortingPoints } from '../../utils/calculateRating';

const TopThreeBoxStyled = styled.div`
	padding: 2.4rem 1.5rem;
	/* display: flex; */
	display: grid;
	/* flex-direction: column; */
	align-items: center;
	border-radius: 4px;

	@media only screen and (max-width: 75em) {
		padding: 6.2rem 0;
		/* align-items: start; */
	}
`;

const TopThreeUlList = styled.ul`
	/* display: flex;
	flex-direction: column; */
	display: grid;
	grid-template-columns: 1fr;
	gap: 3.2rem;
	margin-top: 2.4rem;

	// 1200px
	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr 1fr;
	}

	// 768px
	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;

const TopThreeHeading = styled(Heading)`
	text-align: center;
	@media only screen and (max-width: 75em) {
		text-align: left;
	}
`;

const LoaderBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SpinnerMiniMd = styled(SpinnerMini)`
	width: 5rem;
	color: var(--accent-150);
`;

const NoBooks = styled.p`
	padding: 1.2rem 0;
	color: var(--text-200);
`;
const TopThreeBox = () => {
	const { isLoading, books, errFetchBooks } = useFetchBooks();
	const sortedBooks = books?.sort((a, b) => {
		const pointsA = calculateSortingPoints(a.reviews);
		const pointsB = calculateSortingPoints(b.reviews);

		return pointsB - pointsA;
	});

	if (isLoading)
		return (
			<LoaderBox>
				{/* <Loader /> */}
				<SpinnerMiniMd />
			</LoaderBox>
		);

	if (errFetchBooks) return <p>{errFetchBooks}</p>;
	return (
		<TopThreeBoxStyled>
			<TopThreeHeading gradient='false' as='h2'>
				Top 3
			</TopThreeHeading>

			{sortedBooks?.length === 0 && <NoBooks>Brak książek do wyświetlenia</NoBooks>}
			<TopThreeUlList>
				{sortedBooks?.slice(0, 3).map((book, index) => (
					<TopThreeBooksListItem key={book._id} book={book} index={index} />
				))}
			</TopThreeUlList>
		</TopThreeBoxStyled>
	);
};

export default TopThreeBox;
