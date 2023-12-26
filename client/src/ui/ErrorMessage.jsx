/* eslint-disable react/prop-types */
import styled from 'styled-components';

const ErrorMessageStyled = styled.p`
	font-size: 1.35rem;
    /* font-weight: 500; */
	color: red;
	/* text-align: center */
`;

export default function ErrorMessage({ children }) {
	return <ErrorMessageStyled>{children}</ErrorMessageStyled>;
}
