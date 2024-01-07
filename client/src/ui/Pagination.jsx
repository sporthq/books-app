/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PAGE_SIZE } from '../utils/constans.js';

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	// 592px

	@media only screen and (max-width: 37em) {
		padding-top: 2.4rem;
		flex-direction: column;
	}
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;
const StyledNumber = styled.span`
	color: var(--accent-200);
	font-weight: 700;
`;
const PaginationButton = styled.button`
	background-color: ${(props) => (props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)')};
	color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--accent-150);
		color: #fff;
	}
`;

export default function Pagination({ count, pageSize }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	const pageCount = Math.ceil(count / pageSize);
	function nextPage() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;

		searchParams.set('page', next);
		setSearchParams(searchParams);
	}

	function previousPage() {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;

		searchParams.set('page', prev);
		setSearchParams(searchParams);
	}

	if (pageCount <= 1) return null;
	return (
		<StyledPagination>
			<P>
				Wyświetlono od <StyledNumber>{(currentPage - 1) * pageSize + 1}</StyledNumber> do
				<StyledNumber>&nbsp;{currentPage === pageCount ? count : currentPage * pageSize}</StyledNumber> z{' '}
				<StyledNumber>{count}</StyledNumber> wyników
			</P>
			<Buttons>
				<PaginationButton onClick={previousPage} disabled={currentPage === 1}>
					<HiChevronLeft /> <span>Poprzednia</span>
				</PaginationButton>
				<PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
					<span>Następna</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}
