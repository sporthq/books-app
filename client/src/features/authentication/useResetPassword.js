import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../services/authentication/apiUsers';

function useResetPassword() {
	const {
		mutate: resetUserPassword,
		isPending,
		isSuccess,
		error,
		data
		
	} = useMutation({
		mutationFn: ({password, token}) => resetPassword({password, token}),
	});

	return { resetUserPassword, isPending, isSuccess, error,data };
}

export default useResetPassword;
