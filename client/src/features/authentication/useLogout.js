import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useLogout() {
	function logoutUser() {
		localStorage.removeItem('userInfo');
	}
	const {
		mutate: logout,
		isPending,
	} = useMutation({
		mutationFn: logoutUser,
		onSuccess: () => toast.success('Wylogowno pomyślnie'),
		onError: (err) => toast.error('Wystąpił nieoczekiwany błąd'),
	});

	return { logout, isPending };
}
// export default function UseLogout() {
// 	localStorage.removeItem('userInfo');
// 	toast.success('Wylogowno pomyślnie');
// }
