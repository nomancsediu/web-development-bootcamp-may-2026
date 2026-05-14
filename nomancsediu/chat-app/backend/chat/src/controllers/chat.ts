import TryCatch from "../config/TryCatch.js"
import type { Response } from "express"
import type { AuthenticatedRequest } from "../middleware/isAuth.js"
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Messages.js";
import axios from "axios";

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
            users: {$all: [userId, otherUserId], $size: 2},
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
);

export const getAllChats = TryCatch(
    async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;

        if(!userId)
        {
            res.status(400).json({
                message:"User id is required",
            });
            return;
        }

        const chats = await Chat.find({
            users: userId,
        }).sort({updatedAt: -1});

        const chatWithUserData = await Promise.all(
            chats.map(async (chat) => {
                const otherUserId = chat.users.find(id=>id.toString()!==userId?.toString());

                const unseenCount = await Message.countDocuments({
                    chatId: chat._id,
                    seen: false,
                    sender: {$ne: userId},
                });

                try {

                    const {data} = await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`
                    );

                    return {
                        user: data.user,
                        chat: {
                            ...chat.toObject(),
                            latestMessage: chat.latestMessage?.text ? chat.latestMessage : null,
                            unseenCount,
                        },

                    }
                    
                } catch (error) {
                    console.log("Error fetching user data for chat:", error);
                    return {
                        user: {_id: otherUserId, name: "Unknown User"},
                        chat: {
                            ...chat.toObject(),
                            latestMessage: chat.latestMessage?.text ? chat.latestMessage : null,
                            unseenCount,
                        },
                    };
                    
                }

            }
        ));

        res.status(200).json({
            message:"Chats fetched successfully",
            chats: chatWithUserData,
        });
    
    });


export const sendMessage = TryCatch(
    async (req: AuthenticatedRequest , res: Response) => {

        const senderId = req.user?._id;
        const {chatId,text} = req.body;
        const imageFile = req.file;

        if(!senderId){
            res.status(400).json({
                message:"Sender id is required",
            });
            return; 
        }

        if(!chatId){
            res.status(400).json({
                message:"Chat id is required",
            });
            return; 
        }

        if(!text && !imageFile){
            res.status(400).json({
                message:"Either text or image is required",
            });
            return; 
        }

        const chat = await Chat.findById(chatId);

        if(!chat){
            res.status(404).json({
                message:"Chat not found",
            });
            return; 
        }

        const isUserInChat = chat.users.some(
            (userId) => userId.toString() === senderId.toString()
        );

        if(!isUserInChat){
            res.status(403).json({
                message:"You are not a member of this chat",
            });
            return; 
        }

        const otherUserId = chat.users.find(
            (userId) => userId.toString() !== senderId.toString()
        );

        if(!otherUserId){
            res.status(400).json({
                message:"Other user not found",
            });
            return; 
        }


        let messageData: any = {
            chatId: chatId,
            sender: senderId,
            seen: false,
            seetAt: undefined,
        };

        if(imageFile){
            messageData.image = {
                url: imageFile.path,
                publicId: imageFile.filename,
            };

            messageData.messageType = "image";
            messageData.text = text || "";
        }
        else{
            messageData.text = text;
            messageData.messageType = "text";
        }

        const message = new Message(messageData);
        const savedMessage = await message.save();

        const latestMessageText = imageFile ? "Sent an image" : text;

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: {
                text: latestMessageText,
                sender: senderId,

            },
            updatedAt: new Date(),

        
        }, {new: true});


        //emit socket event to other user in chat

        res.status(201).json({
            message: savedMessage,
            senderId: senderId,
        });
});


export const getMessagesByChat = TryCatch(async (req: AuthenticatedRequest, res: Response)=>{
   const userId = req.user?._id;
   const {chatId} = req.params;
    if(!userId){
        res.status(401).json({
            message:"User id is required",
        });
        return;
    }
    if(!chatId){
        res.status(400).json({
            message:"Chat id is required",
        });
        return;
    }

    const chat = await Chat.findById(chatId);

    if(!chat){
        res.status(404).json({
            message:"Chat not found",
        });
        return;
    }

    const isUserInChat = chat.users.some(
        (id) => id.toString() === userId.toString()
    );

    if(!isUserInChat){
        res.status(403).json({
            message:"You are not a member of this chat",
        });
        return;
    }

    const messegesToMarkSeen = await Message.find({
        chatId,
        seen: false,
        sender: {$ne: userId},

    });

    await Message.updateMany(
        {
            chatId,
            seen: false,
            sender: {$ne: userId},
        },
        {
            seen: true,
            seetAt: new Date(),
        }
    );


    const messages = await Message.find({chatId}).sort({createdAt: 1});

    const otherUserId = chat.users.find((id) => id!== userId);

    try {
    const {data} = await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);
       
    
    if(!otherUserId){
        res.status(400).json({
            message:"Other user not found",
        });
        return;
    };

    //socket work

    res.status(200).json({  
        messages,
        user: data.user,
    });


    } 
    
    catch (error) {
        console.log(error);
        res.json({
            messages,
            user: {_id: otherUserId, name: "Unknown User"},
        });
    }

});