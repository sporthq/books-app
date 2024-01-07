import styled from "styled-components";

const InputForm = styled.input`
	position: relative;
	padding: 0.8rem 1.2rem;
	font-family: inherit;
	background-color: var(--bg-100);
	border: 1px solid var(--accent-200);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	width: 100%;
	transition: transform 0.3s;

	&:focus {
		outline: 1px solid var(--accent-200);

		transform: translateY(-0.1rem);
	}
`;

export default InputForm;
