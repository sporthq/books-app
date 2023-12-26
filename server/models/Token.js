import { model, Schema } from 'mongoose';

const TokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

const Token = model('Token', TokenSchema);

export default Token;
