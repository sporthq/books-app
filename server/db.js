// Create connect to MongooseDB 
import mongoose from 'mongoose';

const connectToDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);
	} catch (error) {
        console.log(`Error ${error.message}`);
    }
};

export default connectToDB