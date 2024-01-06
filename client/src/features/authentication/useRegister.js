import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../../services/authentication/apiUsers';
import toast from 'react-hot-toast';

export default function useRegister() {
	const queryClient = useQueryClient();
	const {
		mutate: registerUser,
		error,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: ({ name, email, password }) => register({ name, email, password }),
		onSuccess: (user) => {
			console.log(user);
			toast.success('Konto zostało utworzone, sprawdź swoją pocztę bo dokończyć rejestrację.');
			queryClient.setQueriesData(['user'], user.user);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { registerUser, isPending, error, isSuccess };
}
