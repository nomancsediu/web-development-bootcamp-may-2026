import { User } from '@/context/AppContext';
import React from 'react'
import { useState } from 'react';
import { MessageCircle, Plus, Search, UserCircle, X, LogOut } from 'lucide-react';
import { Chats } from '@/context/AppContext';
import Link from 'next/link';

interface ChatSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showAllUser: boolean;
  setShowAllUser: (show: boolean | ((prev: boolean) => boolean)) => void;
  users: User[] | null;
  loggedInUser: User | null;
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  handleLogOut: () => void;
  chats: Chats[] | null;
  createChat: (user: User) => void;
}

const ChatSidebar = ({ sidebarOpen, setSidebarOpen, showAllUser,
  setShowAllUser, users, loggedInUser, selectedUser,
  setSelectedUser, handleLogOut, chats, createChat }: ChatSidebarProps) => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <aside className={`fixed z-20 top-0 left-0 h-screen
    w-80 bg-slate-900 border-r border-slate-700 transform 
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform duration-300
    flex flex-col`}>

      {/* Header */}
      <div className='px-5 py-3 border-b border-slate-700'>
        <div className='sm:hidden flex justify-end mb-0'>
          <button onClick={() => setSidebarOpen(false)} className='p-2 hover:bg-slate-700 rounded-lg transition-colors'>
            <X className='w-5 h-5 text-slate-300' />
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
              <MessageCircle className='w-5 h-5 text-white' />
            </div>
            <span className='text-white font-extrabold text-2xl tracking-wide'>
              {showAllUser ? "New Chat" : "Alapon"}
            </span>
          </div>

          <button className={`p-2 rounded-lg transition-colors ${showAllUser ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
            onClick={() => setShowAllUser(prev => !prev)}>
            {showAllUser ? <X className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-hidden px-4 py-2 min-h-0'>
        {showAllUser ? (
          <div className='space-y-4 h-full'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input type="text" placeholder='Search Users...'
                className='w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-blue-500'
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            <div className='space-y-2 overflow-auto h-full pb-4'>
              {searchQuery.trim() && users?.filter((u) => u._id !== loggedInUser?._id &&
                u.name.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                  <button key={u._id} className='w-full text-left p-4 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-colors'
                    onClick={() => createChat(u)}>
                    <div className='flex items-center gap-3'>
                      <UserCircle className='w-8 h-8 text-slate-300' />
                      <span className='font-medium text-white'>{u.name}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ) : (
          chats && chats.length > 0 ? (
            <div className='space-y-2 overflow-y-auto h-full pb-4'>
              {chats.map((chat) => {
                const latestMessage = chat.chat.latestMessage;
                const isSelected = selectedUser === chat.chat._id;
                const isSentByMe = latestMessage?.sender === loggedInUser?._id;
                const unseenCount = chat.chat.unseenCount || 0;

                return (
                  <button key={chat.chat._id} onClick={() => {
                    setSelectedUser(chat.chat._id)
                    setSidebarOpen(false);
                  }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${isSelected ? "bg-blue-600 border border-blue-500" : "border border-slate-700 hover:border-slate-600 hover:bg-slate-800"}`}>
                    <div className='flex items-center gap-3'>
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                        <UserCircle className='w-7 h-7 text-slate-300' />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold truncate ${isSelected ? "text-white" : "text-slate-200"}`}>{chat.user.name}</span>
                          {unseenCount > 0 && (
                            <div className="bg-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-2">
                              {unseenCount > 99 ? "99+" : unseenCount}
                            </div>
                          )}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                          {latestMessage?.text ? `${isSentByMe ? "You: " : ""}${latestMessage.text}` : "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center'>
              <div className='p-4 bg-slate-900 rounded-full mb-4'>
                <MessageCircle className='w-8 h-8 text-slate-400' />
              </div>
              <p className="text-slate-400 font-medium">No conversation yet</p>
              <p className='text-sm text-slate-500 mt-1'>Start a new chat to begin messaging</p>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className='p-4 border-t border-slate-700 space-y-2'>
        <Link href={'/profile'} className='flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors w-full border border-slate-700'>
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <UserCircle className='w-5 h-5 text-white' />
          </div>
          <span className='text-sm text-white font-semibold'>Profile</span>
        </Link>
        <button onClick={handleLogOut} className='flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-red-600 transition-colors border border-slate-700 hover:border-red-600 group'>
          <LogOut className='w-5 h-5 text-slate-300 group-hover:text-white' />
          <span className='text-sm text-slate-300 font-semibold group-hover:text-white'>Logout</span>
        </button>
      </div>

    </aside>
  )
}

export default ChatSidebar
