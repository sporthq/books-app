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
const TopThreeBoxStyled = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 1/-1;
	margin-top: 7.2rem;

	@media only screen and (max-width: 75em) {
		margin-top: 0;
		padding: 6.2rem 0;
	}
`;

const LastAddedListUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2.4rem;
	padding: 2.4rem 0;
	animation: ${fadeIn} 0.5s ease-in-out;
`;
const ShowAllButton = styled(Button)`
	display: flex;
	align-items: center;
	margin-top: 1.2rem;
	align-self: end;
	transition: transform 0.3s;
	margin-right: 2.4rem;

	&:hover {
		transform: translateY(-1px);
		/* opacity: 0; */
	}
`;

const HiArrowRightStyled = styled(HiArrowRight)`
	margin-left: 0.8rem;
`;

const LastedAdded = () => {
	const { isLoading, books, errFetchBooks } = useFetchBooks();
	return (
		<TopThreeBoxStyled>
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
		</TopThreeBoxStyled>
	);
};

export default LastedAdded;