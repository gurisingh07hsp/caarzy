import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import {signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
interface PageProps {
    closeModal: (value: boolean) => void;
}
const AuthModal = ({closeModal}:PageProps) => {
    const {setUser, setIsLoggedIn} = useUser();
    const [tab, setTab] = useState<'login' | 'register'>('login');
    const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
    const [message, setMessage] = useState("");
    const [showForgot, setShowForgot] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            if(tab === 'login'){
                const userData = {
                    email: form.email,
                    password: form.password
                };
                try{
                    const response = await axios.post(`/api/login`, userData, {withCredentials: true});
                    if(response.status === 200){
                        setIsLoggedIn(true);
                        console.log(response.data);
                        setUser(response.data.user);
                        closeModal(false);
                    }
                    else{
                        setMessage(response.data.message);
                    }
                }catch(error){
                    if ((error as any).response) {
                        setMessage((error as any).response.data.message || "Something went wrong");
                    } else {
                    setMessage("Network error. Please try again.");
                    } 
                    console.log(error);
                }
            }
            else{
                const newUser = {
                    username: form.username,
                    phone: form.phone,
                    email: form.email,
                    password: form.password,
                };
                try{
                    const response = await axios.post(`/api/register`, newUser, {withCredentials: true});
                    if(response.status === 200){
                        console.log(response.data);
                        setIsLoggedIn(true);
                        setUser(response.data.user);
                        closeModal(false);         
                    }
                }catch(error: any){
                    setMessage(error.response.data.message);
                }
            }
    };

    const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/forgotpassword`,{ email: form.email });
      if (response.status == 200){
        setLoading(false);
        window.location.href = `/forgotpassword?email=${form.email}`;
        console.log(response.data);
      } else {
        setLoading(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Email not found");
      console.log(error);
    }
  };

  return (
    <div onClick={()=> {closeModal(false)}} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
        <div onClick={(e)=>e.stopPropagation()} className={`${showForgot ? "hidden" : "block"} bg-white rounded-lg p-6 w-[90%] max-w-96`}>
            <h2 className='lg:text-lg font font-medium'>Login or Register</h2>
            <div className='bg-gray-100 grid grid-cols-2 rounded-lg mt-4 p-1'>
                <button onClick={()=> setTab('login')} className={`${tab === 'login' && 'bg-black text-white'} py-2 rounded-lg`}>Login</button>
                <button onClick={()=> setTab('register')} className={`${tab === 'register' && 'bg-black text-white'} py-2 rounded-lg`}>Register</button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-3 flex flex-col items-center mt-4'>
                {tab === 'register' && <input type='text'
                 value={form.username}
                 onChange={(e)=> setForm({...form, username: e.target.value})}
                 required
                 placeholder='Username' className='border w-[90%] px-4 py-2 rounded-lg'></input>}
                {tab === 'register' && <input type='tel'
                value={form.phone}
                onChange={(e)=> setForm({...form, phone: e.target.value })}
                required
                placeholder='Phone' className='border w-[90%] px-4 py-2 rounded-lg'></input>}
                <input type='email'
                 value={form.email}
                 onChange={(e)=> setForm({...form, email: e.target.value})}
                 required
                 placeholder='Email' className='border w-[90%] px-4 py-2 rounded-lg'></input>
                <input type='password'
                value={form.password}
                onChange={(e)=> setForm({...form, password: e.target.value})}
                required 
                placeholder='Password' className='border w-[90%] px-4 py-2 rounded-lg'></input>
                {message && <p className=''>{message}</p>}
                <input type='submit' value={`${tab === 'login' ? 'Login' : 'Register'}`} className='bg-orange-500 text-white w-[90%] py-2 rounded-lg cursor-pointer'></input> 
            </form>
            {tab === "login" && (
                <button
                onClick={() => setShowForgot(true)}
                className="text-blue-600 ms-[35%] mt-2 hover:text-blue-700 text-sm transition-colors"
                >
                Forgot password?
                </button>
            )}
            <div className='flex items-center mt-2'>
                <div className='w-[50%] border'></div>
                <div className='px-2'>or</div>
                <div className='w-[50%] border'></div>
            </div>
            <div className='flex justify-center mt-2'>
                <button onClick={() => signIn("google", { callbackUrl: "/" })} className='flex items-center justify-center border rounded-lg py-2 w-[90%]'>
                <FcGoogle className="mr-2 size-5" />
                Continue with Google</button>
            </div>
        </div>
    <section
        onClick={(e)=>e.stopPropagation()}
        className={`${
          showForgot ? "flex" : "hidden"
        } min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent`}
      >
        <form
          onSubmit={handleClick}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden bg-white rounded-lg border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div className="text-center">
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Recover Password
              </h1>
              <p className="text-sm">Enter your email to receive a OTP</p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="name@example.com"
                  className='border w-full px-3 py-2 rounded-lg'
                />
              </div>

              <input
                type="submit"
                className="w-full bg-orange-500 py-2 text-white rounded-md cursor-pointer"
                value={`${loading ? "Sending..." : "Send OTP"}`}
              />
            </div>
            <p className="text-center mt-3 text-red-600">{message}</p>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                We&apos;ll send you a OTP to reset your password.
              </p>
            </div>
          </div>

          <div className="p-3 bg-zinc-50">
            <p className="text-accent-foreground text-center text-sm">
              Remembered your password?
              <button
                onClick={() => setShowForgot(false)}
                className="px-2 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AuthModal
