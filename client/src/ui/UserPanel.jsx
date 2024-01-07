import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { VscPreview } from 'react-icons/vsc';
import Button from '../ui/Button';
import { useLogout } from '../features/authentication/useLogout';
import { useEffect, useRef, useState } from 'react';
import { CgMenuRight } from 'react-icons/cg';
const UserPanelBox = styled.div`
	display: flex;
	gap: 1rem;

	// 768px
	@media only screen and (max-width: 48em) {
		display: none;
	}
`;

const UserInfo = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 1.2rem;
`;

const UserImage = styled.img`
	height: 3rem;
	border-radius: 50%;
	align-self: end;
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-2px);
	}
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

const LinkToProfile = styled.div`
	position: relative;
	display: flex;
	cursor: pointer;
`;

const BoxMenu = styled.div`
	position: absolute;
	top: 130%;
	right: 44%;
	left: -500%;

	padding: 0.5rem 2rem;
	/* min-width: 200px; */
	font-size: 1.45rem;
	border: 1px solid var(--accent-200);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-tiny);
	transition: background-color 0.3s;

	&:hover {
		background-color: var(--grey-0);
	}

	&:hover::before {
		background-color: var(--accent-150);
	}
	&::before {
		content: '';
		position: absolute;
		right: -5px;
		top: -5px;
		height: 10px;
		width: 10px;
		transform: rotate(45deg);
		border-radius: 2.5px;
		background-color: #fff;

		border: 1px solid var(--accent-200);
		transition: background-color 0.3s;

		/* border: 1px solid var(--accent-150); */
	}
`;
const BoxMenuListItem = styled.li``;

const LinkToReview = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.3rem;
	color: var(--accent-200);
	font-weight: 500;
`;

const VscPreviewStyled = styled(VscPreview)`
	margin-top: 0.1rem;
`;

const UserName = styled.p`
	// 768px
	@media only screen and (max-width: 48em) {
		display: none;
	}
	// 576px
	@media only screen and (max-width: 36em) {
	}
`;

const BoxMenuMobile = styled.div`
	position: relative;
	display: none;

	// 768px
	@media only screen and (max-width: 48em) {
		display: block;
	}
	// 576px
	@media only screen and (max-width: 36em) {
	}
`;

const CgMenuRightStyled = styled(CgMenuRight)`
	font-size: 2rem;
	cursor: pointer;
	color: var(--accent-200);
`;

const MobileMenuLink = styled.nav`
	right: 150%;

	min-width: 15rem;
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.2rem 2rem;
	border: 1px solid var(--accent-200);
	background-color: #fff;
	border-radius: var(--border-radius-sm);
	z-index: 100;
`;

const MobileLink = styled(Link)`
	font-weight: bold;
	padding: 1.2rem 0;
	color: var(--accent-200);
	/* border-bottom: 2px solid var(--accent-150); */

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		color: var(--accent-150);
	}
`;
export default function UserPanel() {
	const [showMenu, setShowMenu] = useState(false);
	const [showMenuMobile, setShowMenuMobile] = useState(false);
	const user = JSON.parse(localStorage.getItem('userInfo'));
	const ref = useRef();
	const mobileRef = useRef(null);

	const { logout } = useLogout();
	function handlerLogout() {
		logout();
	}

	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setShowMenu(false);
			}
		}
		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	}, []);

	useEffect(() => {
		function handleClick(e) {
			if (mobileRef.current && !mobileRef.current.contains(e.target)) {
				setShowMenuMobile(false);
			}
		}
		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	}, []);

	return (
		<>
			{user ? (
				<UserInfo>
					<UserName>{user?.name}</UserName>
					<LinkToProfile
						ref={ref}
						onClick={() => {
							setShowMenu(!showMenu);
						}}
					>
						<UserImage
							src={user.googleImage || '/default-user.jpg'}
							alt={`avatar of ${user?.name}`}
							onError={(e) => {
								e.target.src = '/default-user.jpg';
							}}
						/>
						{showMenu && (
							<BoxMenu>
								<ul>
									<BoxMenuListItem>
										<LinkToReview to={`/user-profile/${user?._id}`}>
											<VscPreviewStyled />
											Twoje recenzje
										</LinkToReview>
									</BoxMenuListItem>
								</ul>
							</BoxMenu>
						)}
					</LinkToProfile>
					<Link to='/'>
						<ButtonLogout onClick={handlerLogout}>
							<LogoutIcon />
						</ButtonLogout>
					</Link>
				</UserInfo>
			) : (
				<>
					<BoxMenuMobile ref={mobileRef}>
						<CgMenuRightStyled onClick={() => setShowMenuMobile(!showMenuMobile)} />
						{showMenuMobile && (
							<MobileMenuLink>
								<MobileLink to={'/login'}>Zaloguj</MobileLink>
								<hr style={{ color: 'var(--accent-150)' }} />
								<MobileLink to={'/register'}>Załóż konto</MobileLink>
							</MobileMenuLink>
						)}
					</BoxMenuMobile>
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
				</>
			)}
		</>
	);
}
