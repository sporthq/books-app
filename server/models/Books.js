import mongoose from 'mongoose';

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
		reviews: {
			type: Array,
			default: [],
			required: true,
		},
		numOfReviews: {
			type: Number,
			default: 0
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
