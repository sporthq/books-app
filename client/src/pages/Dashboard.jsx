import styled from 'styled-components';
import SearchListBox from '../features/books/SearchListBox.jsx';
import TopThreeBox from '../features/books/TopThreeBox.jsx';
import LastedAdded from '../features/books/LastedAdded.jsx';


const Box = styled.div`
	display: grid;
	grid-template-columns: 70% 35%;
	min-height: 80dvh;
	/* overflow: hidden; */

	color: var(--text-100);

	@media only screen and (max-width: 75em) {
		grid-template-columns: 1fr;
		padding-right: 0 4rem;
	}
`;

export default function Dashboard() {
	return (
		<Box>
			<SearchListBox />
			<TopThreeBox />
			<LastedAdded />
		</Box>
	);
}
