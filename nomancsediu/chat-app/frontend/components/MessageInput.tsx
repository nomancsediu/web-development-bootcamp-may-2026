import React from 'react'
import { useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';

interface MessageInputProps {
    selectedUser: string | null;
    message: string;
    setMessage: (message: string) => void;
    handleMessageSend: (e: any, imageFile?: File | null) => void
}

const MessageInput = ({ selectedUser, message, setMessage, handleMessageSend }: MessageInputProps) => {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!message.trim() && !imageFile) return

        setIsUploading(true);
        await handleMessageSend(e, imageFile)
        setImageFile(null);
        setIsUploading(false)
    }

    if (!selectedUser) return null;

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 border-t border-slate-700 px-5 py-3 bg-slate-950 flex-shrink-0'>
            {imageFile && (
                <div className='relative w-fit'>
                    <img src={URL.createObjectURL(imageFile)} alt="preview" className='w-24 h-24 object-cover rounded-lg border border-slate-600' />
                    <button type='button' className='absolute -top-2 -right-2 bg-black rounded-full p-1'
                        onClick={() => setImageFile(null)}>
                        <X className='w-4 h-4 text-white' />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-2">
                <label className='cursor-pointer bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors border border-slate-700'>
                    <Paperclip size={18} className='text-slate-300' />
                    <input type="file" accept="image/*" className='hidden' onChange={e => {
                        const file = e.target.files?.[0];
                        if (file && file.type.startsWith("image/")) {
                            setImageFile(file);
                        }
                    }} />
                </label>

                <input type="text" className='flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors'
                    placeholder={imageFile ? "Add a caption..." : "Type a message..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />

                <button type='submit' disabled={isUploading || (!message.trim() && !imageFile)}
                    className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-3 py-3 transition-colors'>
                    <Send size={18} className='text-white' />
                </button>
            </div>
        </form>
    )
}

export default MessageInput
