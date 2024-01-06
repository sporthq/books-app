import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBookReview } from '../../services/books/apiBooks';

export function useAddReview() {
	const queryClient = useQueryClient();
	const {
		mutate: addReview,
		error: errorAddReview,
		isPending,
	} = useMutation({
		mutationFn: ({ bookId, id, contentReview, rating, userName }) =>
			createBookReview({ bookId, id, contentReview, rating, userName }),
		onSuccess: () => {
			toast.success('Recenzja została dodana.');
			queryClient.invalidateQueries({
				queryKey: ['reviews'],
			});
			queryClient.invalidateQueries({
				queryKey: ['book'],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { addReview, errorAddReview, isPending };
}
