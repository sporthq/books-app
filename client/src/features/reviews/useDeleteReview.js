import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserReview } from '../../services/authentication/apiUsers';
import toast from 'react-hot-toast';
const useDeleteReview = () => {
	const queryClient = useQueryClient();
	const {
		mutate: deleteReview,
		isPending,
		error: deleteError,
	} = useMutation({
		mutationFn: ({ userId, reviewId }) => deleteUserReview({ userId, reviewId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['reviews'],
			});
			toast.success('Recenzja została usunięta');
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteReview, isPending, deleteError };
};

export default useDeleteReview;
