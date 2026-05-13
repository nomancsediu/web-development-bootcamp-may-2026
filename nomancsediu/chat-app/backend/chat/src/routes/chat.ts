import express from 'express';
import { createNewChat } from '../controllers/chat.js';


const router = express.Router();


router.post('/chat/new', createNewChat);

export default router;