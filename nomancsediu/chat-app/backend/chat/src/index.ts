import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import chatRoutes from './routes/chat.js';
import './config/cloudinary.js';
import { app,server } from './config/socket.js';

dotenv.config();

connectDb();

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'chat-service' });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error('Chat service error handler:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});