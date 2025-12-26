"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const router = useRouter();
  const { data: session } = useSession();

    const googleRegister = async(session: any) => {
      try{
        const res = await axios.post(`/api/googlelogin`, {
            username: session.user.name,
            email: session.user.email,
          }, {withCredentials: true});
          if(res.status === 200){
            setUser(res.data.user);
          }
      }catch{
        console.log("Google Signin Error");
      }
    }
  
      useEffect(() => {
      if (session?.user) {
        googleRegister(session);
      }
    }, [session]);

      useEffect(() => {
       const getProfile = async() => {
          try{
            const response = await axios.get('/api/profile', {withCredentials: true});
            if(response.status === 200){
                const data = response.data;
                console.log(data);
                setIsLoggedIn(true);
                setUser(data.user);
            }
          }catch(error){
            console.log(error);
          }
       }
        getProfile();
    }, []);

  const logout = async() => {
    try{
        const response = await axios.get('/api/logout', {withCredentials: true});
        if(response.status === 200){
            setIsLoggedIn(false);
            setUser(null);
            router.push('/');
        }
    }catch(error){
        console.log(error);
    }
    signOut({ callbackUrl: "/" });
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};