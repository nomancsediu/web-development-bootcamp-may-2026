import TryCatch from "../config/TryCatch.js"
import type { Response } from "express"
import type { AuthenticatedRequest } from "../middleware/isAuth.js"
import { Chat } from "../models/Chat.js";

export const createNewChat = TryCatch(
    async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;
        const {otherUserId} = req.body;

        if(!otherUserId)
        {
            res.status(400).json({
                message:"Other user id is required",
            });
            return;
        }


        const existingChat = await Chat.findOne({
            user: {$all: [userId, otherUserId], $size: 2},
        });

        if(existingChat)
        {
            res.status(400).json({
                message:"Chat already exists",
                chatId: existingChat._id,
            });
            return;
        }

        const newChat = await Chat.create({
            users: [userId, otherUserId],
        });

        res.status(201).json({
            message:"Chat created successfully",
            chatId: newChat._id,
        });

    }

)