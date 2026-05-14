"use client"

import { useAppData, User } from '@/context/AppContext'
import { useRouter } from 'next/dist/client/components/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { chat_service } from '@/context/AppContext';
import ChatHeader from '@/components/ChatHeader';
import ChatMessages from '@/components/ChatMessages';
import MessageInput from '@/components/MessageInput';
import Loading from '@/components/Loading';


export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  text?: string;
  image?: {
    url: string;
    publicId: string;
  };
  messageType: 'text' | 'image';
  seen: boolean;
  seenAt?: string;
  createdAt: string;
}


const ChatApp = () => {

  const { loading, isAuth, logoutUser, chats, user: loggedInUser,
    users, fetchChats, setChats } = useAppData();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUser, setShowAllUser] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push('/login')
    }
  }, [isAuth, loading, router]);

  useEffect(() => {
    if (selectedUser) {
      fetchChat();
    }
  }, [selectedUser])

  if (loading) return <Loading />

  const handleLogOut = () => {
    logoutUser();
    router.push('/login');
  }

  async function fetchChat() {
    const token = Cookies.get("token")
    try {
      const { data } = await axios.get(`${chat_service}/api/v1/message/${selectedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data.messages);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    }
  }

  const handleMessageSend = async (e: any, imageFile?: File | null) => {
    e.preventDefault()
    if (!message.trim() && !imageFile) return;
    if (!selectedUser) return;

    const token = Cookies.get("token")
    try {
      const formData = new FormData()
      formData.append("chatId", selectedUser)
      if (message.trim()) formData.append("text", message)
      if (imageFile) formData.append("image", imageFile)

      const { data } = await axios.post(`${chat_service}/api/v1/message`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(prev => {
        const current = prev || []
        const exists = current.some(msg => msg._id === data.message._id)
        return exists ? current : [...current, data.message]
      });

      setMessage("")
      await fetchChats();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  }

  const handleTyping = (value: string) => {
    setMessage(value);

    if(!selectedUser) return;

    //socket setup
  };




  async function createChat(u: User) {
    try {
      const token = Cookies.get("token")
      const { data } = await axios.post(`${chat_service}/api/v1/chat/new`,
        { userId: loggedInUser?._id, otherUserId: u._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUser(data.chatId);
      setShowAllUser(false);
      await fetchChats();
    } catch (error: any) {
      const existingChatId = error?.response?.data?.chatId;
      if (existingChatId) {
        setSelectedUser(existingChatId);
        setShowAllUser(false);
      } else {
        toast.error("Failed to start chat");
      }
    }
  }

  return (
    <div className='h-screen flex bg-slate-950 text-white overflow-hidden'>
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setShowAllUser={setShowAllUser}
        showAllUser={showAllUser}
        users={users}
        chats={chats}
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
        createChat={createChat}
      />
      <div className="ml-80 flex-1 flex flex-col h-screen overflow-hidden bg-slate-950">
        {selectedUser ? (
          <>
            <ChatHeader user={user} setSidebarOpen={setSidebarOpen} isTyping={isTyping} />
            <ChatMessages selectedUser={selectedUser} messages={messages} loggedInUser={loggedInUser} />
            <MessageInput selectedUser={selectedUser} message={message} setMessage={setMessage} handleMessageSend={handleMessageSend} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Welcome to Alapon</h2>
              <p className="text-sm text-slate-500">Select a conversation or start a new chat.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatApp
