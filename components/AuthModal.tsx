import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
interface PageProps {
    closeModal: (value: boolean) => void;
}
const AuthModal = ({closeModal}:PageProps) => {
    const {setUser, setIsLoggedIn} = useUser();
    const [tab, setTab] = useState<'login' | 'register'>('login');
    const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
    const [message, setMessage] = useState("");

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
  return (
    <div onClick={()=> {closeModal(false)}} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
        <div onClick={(e)=>e.stopPropagation()} className='bg-white rounded-lg p-6 w-full max-w-96'>
            <h2 className='lg:text-lg font font-medium'>Login or Register</h2>
            <div className='bg-gray-100 grid grid-cols-2 rounded-lg mt-4 p-1'>
                <button onClick={()=> setTab('login')} className={`${tab === 'login' && 'bg-black text-white'} py-2 rounded-lg`}>Login</button>
                <button onClick={()=> setTab('register')} className={`${tab === 'register' && 'bg-black text-white'} py-2 rounded-lg`}>Register</button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-3 flex flex-col items-center mt-4'>
                {tab === 'register' && <input type='text'
                 value={form.username}
                 onChange={(e)=> setForm({...form, username: e.target.value})}
                 placeholder='Username' className='border w-[90%] px-4 py-2 rounded-lg'></input>}
                {tab === 'register' && <input type='tel'
                value={form.phone}
                onChange={(e)=> setForm({...form, phone: e.target.value })} placeholder='Phone' className='border w-[90%] px-4 py-2 rounded-lg'></input>}
                <input type='text'
                 value={form.email}
                 onChange={(e)=> setForm({...form, email: e.target.value})}
                 placeholder='Email' className='border w-[90%] px-4 py-2 rounded-lg'></input>
                <input type='password'
                value={form.password}
                onChange={(e)=> setForm({...form, password: e.target.value})} placeholder='Password' className='border w-[90%] px-4 py-2 rounded-lg'></input>
                <input type='submit' value={`${tab === 'login' ? 'Login' : 'Register'}`} className='bg-orange-500 text-white w-[90%] py-2 rounded-lg cursor-pointer'></input> 
            </form>
            <div className='flex items-center mt-2'>
                <div className='w-[50%] border'></div>
                <div className='px-2'>or</div>
                <div className='w-[50%] border'></div>
            </div>
            <div className='flex justify-center mt-2'>
                <button className='border rounded-lg py-2 w-[90%]'>Continue with Google</button>
            </div>
        </div>
    </div>
  )
}

export default AuthModal
