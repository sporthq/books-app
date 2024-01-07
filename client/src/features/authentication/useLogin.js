import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/authentication/apiUsers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		mutate: loginUser,
		isPending = true,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),
		onSuccess: (user) => {
			toast.success('Zalogowano');

			queryClient.setQueriesData(['user'], user.user);
			navigate('/dashboard', { replace: true });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { loginUser, isPending, error };
}
