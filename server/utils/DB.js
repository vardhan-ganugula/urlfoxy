import mongoose from 'mongoose'; 
import {config} from 'dotenv'; 

config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
        
    }
}