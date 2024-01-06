/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Heading from './Heading';
import Button from './Button';

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--text-200);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
	return (
		<StyledConfirmDelete>
			<Heading as='h2'>Usuń {resourceName}</Heading>
			<p>Jesteś pewny, że chcesz usunąć tę {resourceName}?</p>

			<div>
				<Button $variations='secondary' onClick={onCloseModal} disabled={disabled}>
					Anuluj
				</Button>
				<Button $variations='danger' $sizes='small' onClick={onConfirm} disabled={disabled}>
					Usuń
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;
