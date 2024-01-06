export function calculateAverageRating(reviews) {
	if (!reviews || reviews.length === 0) {
		return 0; // Zwróć 0, jeśli brak recenzji lub pusta lista recenzji.
	}

	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = totalRating / reviews.length;

	return averageRating;
}
// Funkcja do obliczania "punktów" dla sortowania danej książki.
export function calculateSortingPoints(reviews) {
	const MIN_REVIEWS_THRESHOLD = 1; // Próg minimalnej liczby recenzji

	const avgRating = calculateAverageRating(reviews);
	const numReviews = reviews.length;

	// Jeśli książka ma mniej niż MIN_REVIEWS_THRESHOLD recenzji, zwróć tylko średnią ocenę.
	if (numReviews < MIN_REVIEWS_THRESHOLD) {
		return avgRating;
	}

	// Dodaj punkty za średnią ocenę i ilość recenzji.
	const ratingPoints = avgRating * 1.5; // Wartość można dostosować do własnych preferencji.
	const reviewsPoints = Math.min(numReviews / MIN_REVIEWS_THRESHOLD, 2); // Maksymalnie 2 punkty za ilość recenzji.

	return ratingPoints + reviewsPoints;
}
