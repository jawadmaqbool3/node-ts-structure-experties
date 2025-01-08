import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async (): Promise<void> => {

    const dbURI: string | undefined = process.env.MONGO_URI;
    try {
        if (!dbURI) throw new Error('MongoDB URI is not provided');

        await mongoose.connect(dbURI, {});

        console.log(colors.green('MongoDB connected successfully'));

    } catch (error) {

        console.error(
            colors.green('Error connecting to MongoDB')
        );

        process.exit(1);
    }
};

const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();

        console.log('MongoDB disconnected');

    } catch (error) {

        console.error('Error disconnecting from MongoDB:', error);
    }
};

export { connectDB, disconnectDB };
