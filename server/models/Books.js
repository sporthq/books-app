import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			// required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		bookInfo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Books',
			// required: true,
		},
		contentReview: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);
const booksSchema = new mongoose.Schema(
{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		publishedDate: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		reviews: [reviewSchema],
		numOfReviews: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Books = mongoose.model('Books', booksSchema);

export default Books;
export { reviewSchema };
