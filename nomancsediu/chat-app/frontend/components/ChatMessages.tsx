import React, { useEffect, useMemo, useRef } from 'react'
import { Message } from '@/app/chat/page'
import { User } from '@/context/AppContext'
import moment from 'moment'
import { Check, CheckCheck } from 'lucide-react'

interface ChatMessagesProps {
    selectedUser: string | null
    messages: Message[] | null
    loggedInUser: User | null
}

const ChatMessages = ({ selectedUser, messages, loggedInUser }: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null)

    const uniqueMessages = useMemo(() => {
        if (!messages) return []
        const seen = new Set()
        return messages.filter((message) => {
            if (seen.has(message._id)) return false
            seen.add(message._id)
            return true
        })
    }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, [selectedUser, uniqueMessages])

    return (
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
            {!selectedUser ? (
                <p className='text-slate-400 text-center mt-20'>Please select a user to start chatting</p>
            ) : (
                <>
                    {uniqueMessages.map((e, i) => {
                        const isSentByMe = e.sender === loggedInUser?._id
                        const uniqueKey = `${e._id}-${i}`
                        return (
                            <div key={uniqueKey} className={`flex flex-col gap-1 mt-2 ${isSentByMe ? 'items-end' : 'items-start'}`}>
                                <div className={`rounded-lg p-3 max-w-sm ${isSentByMe ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                                    {e.messageType === 'image' && e.image && (
                                        <img src={e.image.url} alt="Shared Image" className='max-w-full h-auto rounded-lg' />
                                    )}
                                    {e.text && <p className='mt-1'>{e.text}</p>}
                                </div>
                                <div className={`flex items-center gap-1 text-xs text-slate-400 ${isSentByMe ? 'pr-2 flex-row-reverse' : 'pl-2'}`}>
                                    <span>{moment(e.createdAt).format('hh:mm A . MMM D')}</span>
                                    {isSentByMe && (
                                        <div className="flex items-center ml-1">
                                            {e.seen ? (
                                                <div className="flex items-center gap-1 text-blue-400">
                                                    <CheckCheck className='w-3 h-3' />
                                                    {e.seenAt && <span>{moment(e.seenAt).format('hh:mm A')}</span>}
                                                </div>
                                            ) : (
                                                <Check className='w-3 h-3 text-slate-500' />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </>
            )}
        </div>
    )
}

export default ChatMessages
