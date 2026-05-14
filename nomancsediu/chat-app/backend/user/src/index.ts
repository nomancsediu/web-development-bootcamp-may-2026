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

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});