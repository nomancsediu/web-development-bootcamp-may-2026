import React from 'react'
import { Menu, UserCircle } from 'lucide-react'
import { User } from '@/context/AppContext'

interface ChatHeaderProps {
    user: User | null
    setSidebarOpen: (open: boolean) => void
    isTyping: boolean
}

const ChatHeader = ({ user, setSidebarOpen, isTyping }: ChatHeaderProps) => {
  return (
    <>
      <div className='sm:hidden fixed top-4 right-4 z-30'>
        <button className='p-2 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors' onClick={() => setSidebarOpen(true)}>
          <Menu className='w-4 h-4 text-slate-200' />
        </button>
      </div>

      <div className="px-5 py-3 bg-slate-900 border-b border-slate-700 flex-shrink-0">
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center'>
            <UserCircle className='w-5 h-5 text-slate-300' />
          </div>
          <div>
            <h2 className='text-sm font-semibold text-white'>{user?.name}</h2>
            {isTyping && <p className='text-xs text-green-400'>Typing...</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatHeader
