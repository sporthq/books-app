import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAllReviews } from '../../services/books/apiBooks';

const useFetchReviews = () => {
	const [searchParams] = useSearchParams();

	const pageNumber = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
	const { bookId } = useParams();
	const { data: reviews, isLoading } = useQuery({
		queryKey: ['reviews', pageNumber],
		queryFn: () => getAllReviews(bookId, pageNumber),
	});


	return { reviews, isLoading };
};

export default useFetchReviews;
