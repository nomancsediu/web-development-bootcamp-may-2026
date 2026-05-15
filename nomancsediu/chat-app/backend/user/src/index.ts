import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import {createClient} from 'redis';
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from './config/rabitmq.js';
import cors from 'cors';

dotenv.config();

connectDb();
connectRabbitMQ();

export const redisClient = createClient({
    url: process.env.REDIS_URL!,
});

redisClient.connect().then(() => console.log("Redis connected")).catch(console.error);

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://103.42.5.187:8080',
        'http://103.42.5.187:5000',
        'http://103.42.5.187:5002'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'user-service' });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});