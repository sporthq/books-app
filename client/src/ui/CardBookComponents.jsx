import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const LazyLoadImageStyled = styled(LazyLoadImage)`
	width: 12rem;
	height: 17rem;
	object-fit: cover;
	opacity: 1;
	transition:
		opacity 0.3s ease-in-out,
		transform 0.3s ease-in-out;

	&:hover {
		transform: perspective(465px) rotateX(0) rotateY(-10deg);
		opacity: 0.8;
	}
`;

const WithoutImg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 17rem;
	min-width: 12rem;
	border: 2px solid var(--grey-600);
	border-radius: 4px;
`;
const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.35rem 0;
	gap: 0.25rem;
	max-height: 100%;
`;
const BookTitle = styled.p`
	font-size: 1.8rem;
	display: -webkit-box;
	max-width: 100%;
	color: var(--text-200);
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
`;
const BookAuthor = styled.p`
	color: var(--grey-600);
	font-weight: bold;
	display: -webkit-box;
	max-width: 100%;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	overflow: hidden;
	-webkit-line-clamp: 1;
`;

const DataPublished = styled.p`
	align-self: start;
	margin-top: auto;
	font-size: 1.4rem;
`;
const AmountReview = styled.p`
	padding: 0.45rem 0;
	font-size: 1.25rem;
	color: var(--grey-600);
	font-weight: 500;
`;
const BoxImg = styled.div`
	width: 12rem;
	max-height: 17rem;
`;
export { BookAuthor, BookTitle, DataPublished, TextBox, WithoutImg, AmountReview, BoxImg, LazyLoadImageStyled };
