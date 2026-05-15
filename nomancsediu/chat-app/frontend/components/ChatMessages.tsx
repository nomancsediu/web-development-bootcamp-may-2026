import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Message } from '@/app/chat/page'
import { User } from '@/context/AppContext'
import moment from 'moment'
import { Check, CheckCheck, Pencil, Trash2, SmilePlus } from 'lucide-react'

interface ChatMessagesProps {
    selectedUser: string | null
    messages: Message[] | null
    loggedInUser: User | null
    onDeleteMessage: (messageId: string, deleteFor: "me" | "everyone") => void
    onEditStart: (message: Message) => void
    onReact: (messageId: string, emoji: string) => void
}

const SeenStatus = ({ seen, seenAt }: { seen: boolean; seenAt?: string }) => (
    seen ? (
        <div className="relative group flex items-center">
            <CheckCheck className="w-3.5 h-3.5 text-sky-400 cursor-default" />
            {seenAt && (
                <div className="absolute bottom-5 right-0 bg-slate-800 text-white text-[11px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-slate-700">
                    Seen at {moment(seenAt).format('hh:mm A')}
                </div>
            )}
        </div>
    ) : (
        <Check className="w-3.5 h-3.5 text-slate-500" />
    )
)

const QUICK_EMOJIS = ['❤️', '😂', '😮', '😢', '😡', '👍']

const ChatMessages = ({ selectedUser, messages, loggedInUser, onDeleteMessage, onEditStart, onReact }: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [modalMessage, setModalMessage] = useState<Message | null>(null)
    const [menuPos, setMenuPos] = useState<{ top: number; left: number; transformOrigin: string } | null>(null)
    const [reactionBar, setReactionBar] = useState<{ messageId: string; top: number; left: number } | null>(null)

    const uniqueMessages = useMemo(() => {
        if (!messages) return []
        const seen = new Set()
        return messages.filter((msg) => {
            if (seen.has(msg._id)) return false
            seen.add(msg._id)
            return true
        })
    }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, [selectedUser, uniqueMessages])

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('[data-menu]')) {
                setModalMessage(null)
                setMenuPos(null)
                setReactionBar(null)
            }
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, [])

    const openReactionBar = (e: React.MouseEvent, msg: Message) => {
        e.stopPropagation()
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const containerRect = containerRef.current!.getBoundingClientRect()
        const isSentByMe = msg.sender === loggedInUser?._id
        
        // Calculate position with viewport boundaries
        const reactionBarWidth = 220
        let left = isSentByMe ? rect.right - reactionBarWidth : rect.left
        
        // Ensure reaction bar stays within viewport
        if (left < 10) left = 10
        if (left + reactionBarWidth > window.innerWidth - 10) {
            left = window.innerWidth - reactionBarWidth - 10
        }
        
        setReactionBar({
            messageId: msg._id,
            top: Math.max(10, rect.top - 48),
            left,
        })
    }

    const openMenu = (e: React.MouseEvent, msg: Message) => {
        if (msg.deleted) return
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const containerRect = containerRef.current!.getBoundingClientRect()
        const isSentByMe = msg.sender === loggedInUser?._id
        const isText = msg.messageType === 'text'
        
        // Calculate menu dimensions
        const buttonCount = isSentByMe ? (isText ? 3 : 2) : 1
        const menuHeight = buttonCount * 48
        const menuWidth = 192
        
        // Calculate position with viewport boundaries
        const openAbove = rect.top - containerRect.top >= menuHeight
        let top = openAbove ? rect.top - menuHeight : rect.bottom
        let left = isSentByMe ? rect.right - menuWidth : rect.left
        
        // Ensure menu stays within viewport
        if (left < 10) left = 10
        if (left + menuWidth > window.innerWidth - 10) {
            left = window.innerWidth - menuWidth - 10
        }
        if (top < 10) top = rect.bottom
        if (top + menuHeight > window.innerHeight - 10) {
            top = rect.top - menuHeight
        }
        
        setMenuPos({ 
            top: Math.max(10, top), 
            left, 
            transformOrigin: openAbove ? 'bottom' : 'top' 
        })
        setModalMessage(msg)
    }

    const closeMenu = () => { setModalMessage(null); setMenuPos(null) }

    return (
        <div ref={containerRef} key={selectedUser} className="h-full overflow-y-auto px-4 py-3 space-y-1 animate-fadeIn bg-slate-950 overscroll-contain">
            {!selectedUser ? (
                <p className='text-slate-400 text-center mt-20'>Please select a user to start chatting</p>
            ) : (
                <>
                    {uniqueMessages.map((e, i) => {
                        const isSentByMe = e.sender === loggedInUser?._id
                        return (
                            <div key={`${e._id}-${i}`} className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${isSentByMe ? 'items-end' : 'items-start'}`}>
                                    <div className="relative group">
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-[15px] text-white shadow-sm cursor-pointer select-none ${
                                                isSentByMe ? 'bg-blue-600 rounded-br-sm' : 'bg-slate-700 rounded-bl-sm'
                                            }`}
                                            onClick={ev => openMenu(ev, e)}
                                        >
                                            {e.deleted ? (
                                                <p className="italic text-slate-300 text-sm">This message was deleted</p>
                                            ) : (
                                                <>
                                                    {e.messageType === 'image' && e.image && (
                                                        <img src={e.image.url} alt="Shared Image" className='max-w-full h-auto rounded-xl mb-1' />
                                                    )}
                                                    {e.text && <p className='leading-snug'>{e.text}</p>}
                                                </>
                                            )}
                                        </div>
                                        {!e.deleted && (
                                            <button
                                                onClick={ev => openReactionBar(ev, e)}
                                                className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${
                                                    isSentByMe ? '-left-7' : '-right-7'
                                                }`}
                                            ><SmilePlus className="w-4 h-4 text-slate-400 hover:text-white" /></button>
                                        )}
                                    </div>
                                    {!e.deleted && e.reactions && e.reactions.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {Object.entries(
                                                e.reactions.reduce((acc, r) => ({ ...acc, [r.emoji]: (acc[r.emoji] || 0) + 1 }), {} as Record<string, number>)
                                            ).map(([emoji, count]) => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => onReact(e._id, emoji)}
                                                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                                                        e.reactions?.some(r => r.userId === loggedInUser?._id && r.emoji === emoji)
                                                            ? 'bg-blue-600/30 border-blue-500 text-white'
                                                            : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400'
                                                    }`}
                                                >{emoji} {count > 1 ? count : ''}</button>
                                            ))}
                                        </div>
                                    )}

                                    {!e.deleted && (
                                        <div className={`flex items-center gap-1.5 mt-0.5 px-1 ${isSentByMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <span className="text-[11px] text-slate-500">
                                                {moment(e.createdAt).format('hh:mm A · MMM D')}
                                            </span>
                                            {e.edited && <span className="text-[10px] text-slate-500 italic">edited</span>}
                                            {isSentByMe && <SeenStatus seen={e.seen} seenAt={e.seenAt} />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </>
            )}

            {reactionBar && (
                <div
                    data-menu
                    className="fixed z-50 flex gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1.5 shadow-2xl"
                    style={{ 
                        top: reactionBar.top, 
                        left: reactionBar.left,
                        maxWidth: 'calc(100vw - 20px)'
                    }}
                >
                    {QUICK_EMOJIS.map(emoji => (
                        <button
                            key={emoji}
                            className="text-lg sm:text-xl hover:scale-125 transition-transform p-1 min-w-[32px] flex items-center justify-center"
                            onClick={() => { onReact(reactionBar.messageId, emoji); setReactionBar(null) }}
                        >{emoji}</button>
                    ))}
                </div>
            )}

            {modalMessage && menuPos && (
                <div
                    data-menu
                    className="fixed z-50 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden w-44 sm:w-48"
                    style={{ 
                        top: menuPos.top, 
                        left: menuPos.left,
                        maxWidth: 'calc(100vw - 20px)'
                    }}
                >
                    {modalMessage.sender === loggedInUser?._id && modalMessage.messageType === 'text' && (
                        <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition-colors"
                            onClick={() => { onEditStart(modalMessage); closeMenu(); }}
                        >
                            <Pencil className="w-4 h-4 text-blue-400" /> Edit
                        </button>
                    )}
                    {modalMessage.sender === loggedInUser?._id && (
                        <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-700 transition-colors"
                            onClick={() => { onDeleteMessage(modalMessage._id, "everyone"); closeMenu(); }}
                        >
                            <Trash2 className="w-4 h-4" /> Delete for Everyone
                        </button>
                    )}
                    <button
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                        onClick={() => { onDeleteMessage(modalMessage._id, "me"); closeMenu(); }}
                    >
                        <Trash2 className="w-4 h-4 text-slate-400" /> Delete for Me
                    </button>
                </div>
            )}
        </div>
    )
}

export default ChatMessages
