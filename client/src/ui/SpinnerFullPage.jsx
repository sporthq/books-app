import styled from 'styled-components';
import SpinnerMini from './SpinnrerMini';

const SpinnerBox = styled.div`
	height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
    color: var(--accent-200);
`;

const SpinnerMiniStyled = styled(SpinnerMini)`
	width: 6rem;
`;
const SpinnerFullPage = () => {
	return (
		<SpinnerBox>
			<SpinnerMiniStyled />
		</SpinnerBox>
	);
};

export default SpinnerFullPage;
