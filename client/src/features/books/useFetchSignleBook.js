import { useQuery } from '@tanstack/react-query';
import { getSingleBook } from '../../services/books/apiBooks';
import { useParams } from 'react-router-dom';

export function useFetchSingleBook() {
	const {bookId} = useParams()
	const queryKey = ['book', bookId];

	const {
		data: singleBook,
		isLoading,
		error,
	} = useQuery({
		queryKey,
		queryFn: () => getSingleBook(bookId),
		retry: false,
	});

	return { singleBook, isLoading, error };
}
