import { useQuery } from '@tanstack/react-query';
import { getUserReviewsFromDB } from '../../services/authentication/apiUsers';
import { useParams, useSearchParams } from 'react-router-dom';

const useFetchUserReviews = () => {
	const { userId } = useParams();
	const [searchParams] = useSearchParams()
	const pageNumber = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
	
	const {
		data: reviews,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['reviews', userId,pageNumber],
		queryFn: () => getUserReviewsFromDB(userId,pageNumber),
	});

	return { reviews, isLoading, error };
};

export default useFetchUserReviews;
