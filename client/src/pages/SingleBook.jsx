import { useFetchSingleBook } from './../features/books/useFetchSignleBook';

export default function SingleBook() {
	const { singleBook, isLoading, error } = useFetchSingleBook();

	// if (singleBook) {
	// const { title, author, image, numOfReviews, publishedDate, rating, reviews } = singleBook;
	// }

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!singleBook) {
		return <p>Nie ma takiej książki ❌</p>;
	}

	return (
		<div>
			<img src={singleBook?.image} alt="" />
			<p>{singleBook.title}</p>
			{/* Pozostała część renderowania komponentu */}
		</div>
	);
}
