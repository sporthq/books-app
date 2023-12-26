/* eslint-disable react/prop-types */
import { ThreeDots } from 'react-loader-spinner';

export default function Loader({style}) {
	return (
		<ThreeDots
			height='80'
			width='80'
			radius='9'
			color='var(--accent-150)'
			ariaLabel='three-dots-loading'
			wrapperStyle={style}
			wrapperClassName=''
			visible={true}
		/>
	);
}
