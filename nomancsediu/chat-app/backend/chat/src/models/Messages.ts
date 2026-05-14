import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
    chatId: Types.ObjectId;
    sender: string;
    text?: string;
    image?: { url: string; publicId: string; };
    messageType: "text" | "image";
    seen: boolean;
    seenAt?: Date;
    hiddenFrom: string[];
    deleted: boolean;
    deletedAt?: Date;
    edited: boolean;
    reactions: { userId: string; emoji: string }[];
    createdAt: Date;
    updatedAt: Date;
}

const schema: Schema<IMessage> = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            url: String,
            publicId: String,
        },
        messageType: {
            type: String,
            enum: ["text", "image"],
            default: "text",
        },
        seen: {
            type: Boolean,
            default: false,
        },
        seenAt: {
            type: Date,
            default: null,
        },
        hiddenFrom: { type: [String], default: [] },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
        edited: { type: Boolean, default: false },
        reactions: { type: [{ userId: String, emoji: String }], default: [] },
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Messages", schema);
