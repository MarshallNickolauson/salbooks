import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        console.log("Add Mongo URI to .env!".red);
        console.log("(Add JWT secret too)".red);
        process.exit(1);
    }
}
