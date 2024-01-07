import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import AddedBookListItem from './AddedBookListItem';
import { useFetchBooks } from './useFetchBooks';
import Heading from '../../ui/Heading';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';
const fadeIn = keyframes`
  from {
    opacity: 0;

  }
  to {
    opacity: 1;
	
  }
`;
const LastedAddedStyledBox = styled.div`
	display: grid;
	flex-direction: column;
	grid-column: 1/-1;
	margin-top: 7.2rem;

	@media only screen and (max-width: 75em) {
		margin-top: 0;
		padding-top: 6.2rem;
		padding-bottom: 2.4rem;
	}
`;

const LastAddedListUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	gap: 5.2rem;
	padding: 2.4rem 0;
	animation: ${fadeIn} 0.5s ease-in-out;

	// 1200px
	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr 1fr;
	}

	// 768px
	@media only screen and (max-width: 48em) {
		grid-template-columns: 1fr;
	}
`;
const ShowAllButton = styled(Button)`
	display: flex;
	align-items: center;
	margin-top: 1.2rem;
	align-self: flex-end;
	transition: transform 0.3s;
	margin-right: 2.4rem;
	justify-self: end;

	&:hover {
		transform: translateY(-1px);
		/* opacity: 0; */
	}

	@media only screen and (max-width: 36em){
		justify-self: center;
	}
`;

const HiArrowRightStyled = styled(HiArrowRight)`
	margin-left: 0.8rem;
`;

const LastedAdded = () => {
	const { isLoading, books, errFetchBooks } = useFetchBooks();
	return (
		<LastedAddedStyledBox>
			<Heading as='h2'>Ostatnio dodane:</Heading>
			{isLoading && <Loader />}
			{errFetchBooks && <p>Coś poszło nie tak... 🤢</p>}
			{books?.length === 0 && <p>Dodaj pierwszą książkę 😀</p>}

			<LastAddedListUl>
				{Array.isArray(books) &&
					books
						.slice(-3)
						.reverse()
						.map((book) => <AddedBookListItem book={book} key={book._id}></AddedBookListItem>)}
			</LastAddedListUl>
			{books?.length > 0 && (
				<ShowAllButton $variations='primary' $sizes='small' as={Link} to={'/all-books'}>
					Pokaż wszystkie <HiArrowRightStyled />
				</ShowAllButton>
			)}
		</LastedAddedStyledBox>
	);
};

export default LastedAdded;
