import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../../services/authentication/apiUsers';

function useVerifyEmail() {
	const {
		mutate: verifyUserEmail,
		isPending,
		error,
	} = useMutation({
		mutationFn: verifyEmail,
	});

	return { verifyUserEmail, isPending, error };
}

export default useVerifyEmail;
