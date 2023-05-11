import { createContext, useEffect, useState } from "react"

import { supabase } from "../supabaseClient";

import { getSafeContext } from "./getSafeContext";
import { useNotificationContext } from "./NotificationContext";
import Filter from "../components/Filter";

type UserContextProps={
    login: (username:string,password:string)=>void;
    loginData: (username:string,password:string)=>Promise<boolean | undefined>;
    logOut: ()=>void;
    getCity: (city:string)=>void;
    isLoggedIn:boolean;
    image: string | undefined;
    email: string | undefined;
    city: string;
    id: string;
}

export const UserContext=createContext<UserContextProps|null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn,setIsLogged]=useState<boolean>(false);
  const {toggleAlertSuccess, toggleAlertError}=useNotificationContext();
  const [image, setImage] = useState<string>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [city, setCity] = useState<string>('');
  const [id, setId] = useState<string>('');

  async function getProfile(id: string | undefined) {
    const { data:image } = await supabase
    .from('users')
    .select('*')
    .eq('id', id);
    setImage(image && image[0].image);
    setId(image && image[0].id)
    return image && image[0].image;
  }

  const loginData = async (username:string,password:string) => {
    const { data:userData,error } = await supabase.auth.signInWithPassword({ 
      email: username,
      password: password
     });
     if (error) {
        setIsLogged(false);
        toggleAlertError('Bad data!');
        return false;
    }
     if (userData) {
        setIsLogged(true);
        toggleAlertSuccess('Logged in!');
        await getProfile(userData.user?.id);
        setEmail(userData.user?.email);
        return true;
     }
  }

  const login = (username:string,password:string)=>{
    loginData(username,password);
  }

  const logOut=async()=>{
     setIsLogged(false);
     const { error } = await supabase.auth.signOut();
     if (error) throw error;
     <Filter />
  }

  const getCity = (city:string) => {
    setCity(city);
  }

    return (
      <UserContext.Provider value={{ email, image, login, loginData, logOut, getCity, city, isLoggedIn, id }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUserContext = getSafeContext(UserContext, "userContext")