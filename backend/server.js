import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.BACKEND_PORT || 5000;

import userRoutes from './routes/user.routes.js';
import bookRoutes from './routes/book.routes.js';

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
