
import { BsArrowReturnLeft } from 'react-icons/bs';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';
const ButtonStyled = styled(Button)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
const BackToHome = () => {
	return (
		<ButtonStyled $variations='seconadry' $sizes='small' as={Link} to='/'>
			<BsArrowReturnLeft /> Wróc do strony głównej
		</ButtonStyled>
	);
};

export default BackToHome;
