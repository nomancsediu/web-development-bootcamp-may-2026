"use client"
import { ArrowRight, Loader2, Lock, ArrowLeft, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react'
import { useSearchParams, useRouter, redirect } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';  
import { useAppData, user_service } from '@/context/AppContext';
import Loading from './Loading';
import toast from 'react-hot-toast';


const VerifyOtp = () => {

  const { isAuth, setIsAuth, setUser, loading: userLoading,fetchChats,fetchUsers } = useAppData();
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [otp,setOtp] = useState<string[]>(["", "", "","","",""]);
  const [error, setError] = useState<string>("");
  const [timer,setTimer] = useState<number>(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const searchParams = useSearchParams();

  const email: string | null = searchParams.get("email");


  useEffect(() => {
    if(timer>0)
    {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      },1000);
      return () => clearInterval(interval);
    }
  },[timer]);


  const handleInputChange = (index: number, value: string): void => {
    if(value.length>1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("")



    if(value && index < 5)
    {
      inputRefs.current[index+1]?.focus();
    }
  };


  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === 'Backspace' && !otp[index] && index > 0)
    {
      inputRefs.current[index-1]?.focus();
    }
  }


  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void =>{
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text")
    const digits = pasteData.replace(/\D/g, '').slice(0, 6); 

    if(digits.length === 6)
    {
      setOtp(digits.split(""));
      inputRefs.current[5]?.focus();
    }

  }


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join("");
    if(otpString.length !== 6)
    {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const {data} = await axios.post(`${user_service}/api/v1/verify`,{
        otp: otpString, 
        email: email
      });
      toast.success(data.message);
      Cookies.set("token", data.token, {
          expires:15,
          secure: false,
          path:"/",
        }); 
        setOtp(["", "", "","","",""]);
        inputRefs.current[0]?.focus();
        setUser(data.user);
        setIsAuth(true);
        fetchChats();
        fetchUsers();
    } catch (error:any) {
      setError(error.response.data.message);
      
    }
    finally{
      setLoading(false);
    }

  };

  const handleResendOtp = async() => {
    if(timer>0) return;
    setResendLoading(true);
    try {
      await axios.post(`${user_service}/api/v1/login`,{email});
      setTimer(60);
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
    finally{
      setResendLoading(false);
    }
  };


  if(userLoading) return <Loading></Loading>
  if(isAuth) redirect("/chat");

  return <div className='min-h-screen bg-slate-950 flex flex-col md:flex-row'>
        {/* Left Side - Illustration */}
        <div className='hidden md:flex md:w-1/2 relative'>
            <Image
                src='/images/verify-logo.png'
                alt='Alapon Logo'
                fill
                sizes='50vw'
                className='object-cover'
                priority
            />
            <div className='absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10'>
                <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
                    <MessageCircle size={22} className='text-white'/>
                </div>
                <span className='text-white font-extrabold text-3xl tracking-wide'>Alapon</span>
            </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full md:w-1/2 min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-20'>
            <div className='max-w-md w-full mx-auto bg-slate-900 rounded-2xl shadow-2xl shadow-black/60 p-10'>
                <div className='mb-10'>
                    <div className='flex items-center justify-center relative mb-3'>
                        <button onClick={() => router.push('/login')} className='absolute left-0 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-colors'>
                          <ArrowLeft size={20} />
                        </button>
                        <h1 className='text-3xl font-bold text-white'>
                            Verify Your Email
                        </h1>
                    </div>
                    <p className='text-gray-400 text-lg text-center'>
                        We have sent a 6-digit code to 
                    </p>
                    <p className='text-blue-400 font-medium text-center'>
                      {
                        email
                      }
                    </p>
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label  className='block text-sm font-medium text-gray-300 mb-4 text-center'>
                            Enter your 6 digit otp here
                        </label>
            <div className='flex justify-center space-x-3'>
              {
                otp.map((digit, index) => (
                  <input 
                    key={index} 
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className='w-12 h-12 text-center text-xl font-bold border-2 border-gray-600 rounded-lg bg-gray-700 text-white'
                  />
                ))
              }
            </div>
                        <div className='relative'>
                             
                        </div>
                    </div>
             {
            error && <div className='bg-red-900 border border-red-700
            rounded-lg p-3'>
              <p className='text-red-300 text-sm text-center'>
                {error}
              </p>
            </div>
          }
                    <button type='submit' className='w-full bg-blue-600
                    text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50
                    disabled:cursor-not-allowed transition-colors' 
                    disabled={loading}
                    >
                        {
                            loading? 
                            (
                            <div className='flex items-center justify-center gap-2'>
                                <Loader2 className='w-5 h-5' />
                                Verifying...

                            </div>
                        )
                        :
                        (<div className='flex items-center justify-center gap-2'>
                            <span>Verify</span>
                            <ArrowRight className='w-5 h-5'/>
                        </div>)
                        }

                    </button>
                </form>
                        <div className='mt-6 text-center'>
          <p className='text-gray-400 text-sm mb-4'>
            Didn't recieve the code?
          </p>
          {
            timer>0 ? <p className='text-gray-400 text-sm'>Resend Code in {timer} seconds</p>: 
            <button  className='text-blue-400 hover:text-blue-300 font-medium
            text-sm disabled:opacity-50' disabled={resendLoading}>
              {resendLoading ? "Sending...": "Resend Code"}
            </button>
          }
        </div>




            </div>
        </div>

    </div>
}

export default VerifyOtp;