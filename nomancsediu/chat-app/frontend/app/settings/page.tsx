"use client"

import { useAppData } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Camera, UserCircle } from 'lucide-react'
import Loading from '@/components/Loading'

const SettingsPage = () => {
    const { user, loading, isAuth, updateProfile } = useAppData()
    const router = useRouter()

    const [name, setName] = useState("")
    const [isInvisible, setIsInvisible] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [saving, setSaving] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!loading && !isAuth) router.push('/login')
    }, [isAuth, loading])

    useEffect(() => {
        if (user) {
            setName(user.name)
            setIsInvisible(user.isInvisible ?? false)
        }
    }, [user])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("isInvisible", String(isInvisible))
        if (avatarFile) formData.append("avatar", avatarFile)
        await updateProfile(formData)
        setSaving(false)
    }

    if (loading) return <Loading />

    const avatarSrc = avatarPreview || user?.avatar?.url

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-6">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-8">
                    <button onClick={() => router.push('/chat')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-300" />
                    </button>
                    <h1 className="text-xl font-bold text-white">Settings</h1>
                </div>

                <form onSubmit={handleSave} className="space-y-6">

                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative cursor-pointer" onClick={() => fileRef.current?.click()}>
                            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600">
                                {avatarSrc
                                    ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                                    : <UserCircle className="w-14 h-14 text-slate-400" />
                                }
                            </div>
                            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 border-2 border-slate-900">
                                <Camera className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Click to change photo</p>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400 font-medium">Display Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Invisible Toggle */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-xl border border-slate-700">
                        <div>
                            <p className="text-sm font-medium text-white">Invisible Mode</p>
                            <p className="text-xs text-slate-500 mt-0.5">Others will see you as offline</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsInvisible(prev => !prev)}
                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isInvisible ? 'bg-blue-600' : 'bg-slate-600'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isInvisible ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Save */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default SettingsPage
