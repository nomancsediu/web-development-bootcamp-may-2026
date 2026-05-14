import React from 'react'
import { ArrowLeft, Menu, UserCircle } from 'lucide-react'
import { User } from '@/context/AppContext'

interface ChatHeaderProps {
    user: User | null;
    setSidebarOpen: (open: boolean) => void;
    onlineUsers: string[];
    isTyping: boolean;
    onBack?: () => void;
}

const ChatHeader = ({ user, setSidebarOpen, onlineUsers, isTyping, onBack }: ChatHeaderProps) => {
  const isOnlineUser = user && onlineUsers.includes(user._id)
  return (
    <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex-shrink-0 flex items-center gap-3">
      <button className='sm:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors' onClick={onBack}>
        <ArrowLeft className='w-5 h-5 text-slate-200' />
      </button>
      <button className='hidden p-2 hover:bg-slate-700 rounded-lg transition-colors' onClick={() => setSidebarOpen(true)}>
        <Menu className='w-5 h-5 text-slate-200' />
      </button>
      <div className='w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0'>
        {user?.avatar?.url
          ? <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
          : <UserCircle className='w-5 h-5 text-slate-300' />}
      </div>
      <div>
        <h2 className='text-sm font-semibold text-white'>{user?.name}</h2>
        <p className={`text-xs ${isTyping || isOnlineUser ? 'text-green-400' : 'text-slate-400'}`}>
          {isTyping ? 'Typing...' : isOnlineUser ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  )
}

export default ChatHeader
