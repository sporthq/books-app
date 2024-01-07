import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewBookToDb } from '../../services/books/apiBooks';
import toast from 'react-hot-toast';

export function useAddNewBook() {
	const queryClient = useQueryClient();
	const { mutate, isPending, error } = useMutation({
		mutationFn: (book) => addNewBookToDb(book),
		onSuccess: () => {
			toast.success('Ksiazka została dodana!')
			
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
