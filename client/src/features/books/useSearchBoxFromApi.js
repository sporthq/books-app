import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function useSearchBoxFromApi(query) {
	const [data, setData] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchData = useDebouncedCallback(async () => {
		const controller = new AbortController();
		setLoading(true);

		try {
			if (!query) return;
			const response = await axios.get(
				`https://openlibrary.org/search.json?q=${query}
		`,
				{
					signal: controller.signal,
				}
			);

			if (!response) throw new Error('Nie ma takiej ksiązki w naszej bazie');
			setData(response.data?.docs);
			setError('');
			setLoading(false);
		} catch (error) {
			
			if (error.name !== 'CanceledError' || error.name !== 'AbortError') {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}, 300);
	useEffect(() => {
		fetchData(query);
	}, [query]);

	return { data, error, loading };
}
