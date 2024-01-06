import styled from 'styled-components';

const TextArea = styled.textarea`
	padding: 0.8rem 1.2rem;
	border-radius: 5px;
	background-color: var(--bg-100);
	border: 1px solid var(--accent-200);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	min-width: 100%;
	height: 8rem;
    resize: vertical;
	
	&:focus {
		outline: 1px solid var(--accent-200);

		transform: translateY(-0.1rem);
	}
`;

export default TextArea;
