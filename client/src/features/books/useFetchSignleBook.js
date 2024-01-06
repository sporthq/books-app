import { useQuery } from '@tanstack/react-query';
import { getSingleBook } from '../../services/books/apiBooks';
import { useParams } from 'react-router-dom';

export function useFetchSingleBook() {
	const { bookId } = useParams();

	const {
		data: singleBook,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['book', 'reviews', bookId],
		queryFn: () => getSingleBook(bookId),
		retry: false,
	});

	return { singleBook, isLoading, error };
}
