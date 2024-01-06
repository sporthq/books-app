import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewBookToDb } from '../../services/books/apiBooks';

export function useAddNewBook() {
	const queryClient = useQueryClient();
	const { mutate, isPending, error } = useMutation({
		mutationFn: (book) => addNewBookToDb(book),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['books'],
			});
		},
		onError: (error) => {
			console.error('Błąd podczas dodawania książki:', error.message);
		},
	});

	return { mutate, isPending, error };
}
