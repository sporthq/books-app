import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import Button from '../ui/Button';
import { useLogout } from '../features/authentication/useLogout';

const UserPanelBox = styled.div`
	display: flex;
	gap: 1rem;
`;

const UserInfo = styled.div`
	display: flex;
	gap: 1.2rem;
`;

const UserImage = styled.img`
	height: 3rem;

	border-radius: 50%;
`;

const ButtonLogout = styled.button`
	display: flex;
	align-items: center;
	height: 3rem;
	background-color: transparent;
	border: none;
`;

const LogoutIcon = styled(HiArrowRightOnRectangle)`
	font-size: 2.85rem;
	color: var(--accent-200);
`;
export default function UserPanel() {
	const user = JSON.parse(localStorage.getItem('userInfo'));

	console.log(user?.googleImage);
	const { logout } = useLogout();
	function handlerLogout() {
		logout();
	}
	return (
		<>
			{user ? (
				<UserInfo>
					<p>{user.email}</p>
					<UserImage src={user?.googleImage} alt='' />
					<Link>
						<ButtonLogout onClick={handlerLogout}>
							<LogoutIcon />
						</ButtonLogout>
					</Link>
				</UserInfo>
			) : (
				<UserPanelBox>
					<Link to='/login'>
						<Button $sizes='medium' $variations='secondary'>
							Zaloguj
						</Button>
					</Link>
					<Link to='/register'>
						<Button $sizes='medium' $variations='primary'>
							Załóż Konto
						</Button>
					</Link>
				</UserPanelBox>
			)}
		</>
	);
}
