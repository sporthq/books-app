/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoStyled = styled.div`
	background-color: #fff;
	grid-row: 1/4;

	text-align: center;
`;

export default function Logo({ children }) {
	return (
		<Link to={'/'}>
			<LogoStyled>{children} </LogoStyled>
		</Link>
	);
}
