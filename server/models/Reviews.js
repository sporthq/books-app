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
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required: true
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


 const Reviews  = mongoose.model('Reviews', reviewSchema)

 export default Reviews