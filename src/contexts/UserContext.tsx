import { createContext, useState } from "react"

import { getSafeContext } from "./getSafeContext";
import { supabase } from "../supabaseClient";

type UserContextProps={
    login: (username:string,password:string)=>void;
    loginData: (username:string,password:string)=>Promise<boolean | undefined>;
    logOut: ()=>void;
    isLoggedIn:boolean;
    image: string | undefined;
    email: string | undefined;
}

export const UserContext=createContext<UserContextProps|null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn,setIsLogged]=useState<boolean>(false)
  const [image, setImage] = useState<string>('');
  const [email, setEmail] = useState<string | undefined>('');

  async function getProfile(id: string | undefined) {
    const { data:image } = await supabase
    .from('users')
    .select('*')
    .eq('id', id);
    setImage(image && image[0].image);
    return image && image[0].image;
  }

  const loginData = async (username:string,password:string) => {
    const { data:userData,error } = await supabase.auth.signInWithPassword({ 
      email: username,
      password: password
     });
     if (error) {
        setIsLogged(false);
        alert('Bad data!');
        return false;
    }
     if (userData) {
        setIsLogged(true);
        alert('Logged in!');
        await getProfile(userData.user?.id);
        setEmail(userData.user?.email);
        return true;
     }
  }

  const login= (username:string,password:string)=>{
    loginData(username,password);
  }

  const logOut=async()=>{
     setIsLogged(false);
     const { error } = await supabase.auth.signOut();
     if (error) throw error;
  }

    return (
      <UserContext.Provider value={{ email, image, login, loginData, logOut, isLoggedIn }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUserContext = getSafeContext(UserContext, "userContext")