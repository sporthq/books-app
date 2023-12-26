import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '../../services/books/apiBooks';

export function useFetchBooks() {
	const {
		isLoading,
		data: books,
		error: errFetchBooks,
	} = useQuery({
		queryKey: ['books'],
		queryFn: getAllBooks,
	});

	return { isLoading, books, errFetchBooks };
}
