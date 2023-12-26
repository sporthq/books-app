import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../services/authentication/apiUsers';

function useSendForgotPassword() {
	const {
		mutate: sendForgotPassword,
		isPending,
		error,
		isSuccess,
	} = useMutation({
		mutationFn: forgotPassword,
	});

	return { sendForgotPassword, isPending, error, isSuccess };
}

export default useSendForgotPassword;
