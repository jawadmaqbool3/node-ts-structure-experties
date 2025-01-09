import mongoose from 'mongoose';
import colors from 'colors';

/**
 * Establishes a connection to the MongoDB database using the URI specified in the environment variable MONGO_URI.
 * Logs a success message if the connection is established, or an error message and exits the process if the connection fails.
 * 
 * @throws Error if the MongoDB URI is not provided.
 */

/**
 * Establishes a connection to the MongoDB database using the URI specified in the environment variable MONGO_URI.
 * Logs a success message if the connection is established, or an error message and exits the process if the connection fails.
 * 
 * @throws Error if the MongoDB URI is not provided.
 * @returns A Promise that resolves to void if the connection is successful, or rejects to Error if the connection fails.
 */
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

/**
 * Disconnects the MongoDB connection. Logs a success message if the disconnection is successful, or an error message if the disconnection fails.
 * 
 * @returns A Promise that resolves to void if the disconnection is successful, or rejects to Error if the disconnection fails.
 */
const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();

        console.log('MongoDB disconnected');

    } catch (error) {

        console.error('Error disconnecting from MongoDB:', error);
    }
};

export { connectDB, disconnectDB };
