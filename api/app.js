import addressRouter from './routes/address.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.middleware.js';
import express from 'express';
import userRouter from './routes/auth.route.js';

const app = express();

dotenv.config({ path: './.env' });

// Enable Cross-Origin Resource Sharing (CORS) with specified origin and credentials
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(cors({
    origin: '*',
    credentials: true
}));


// Major Configurations -> Production Level Code

// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data with extended support and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));


// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", addressRouter);

// errorHandler Middleware
app.use(errorHandler);

export { app };
