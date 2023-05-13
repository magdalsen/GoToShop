import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { useUserContext } from "../contexts/UserContext";
import style from './LoginWrapper.module.css';
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

const LoginWrapper = ({children}:{children:React.ReactNode}) => {
    const { isLoggedIn, logOut, email, id }=useUserContext();

    async function getMedia() {

        const { data, error } = await supabase.storage.from('shopping').list(id + '/', {
          limit: 10,
          offset: 0
        });

        if (data) {
          return data;
        } else {
          throw error
        }
      }
      const {data:media,isLoading,error}=useQuery(['avatar'],getMedia);

      if(error){
        return <p>Cannot get data</p>
      }
    
      if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <>
            {
                !isLoggedIn ? <>{children}</> :
                <>
                    <Link to={'/'}><Button colorScheme='blue' type="button" onClick={logOut}>Wyloguj</Button></Link>
                    <div>Witaj, {email}</div>
                    <div>

                            {media?.length === 0 ? 
                              <img 
                              src={`https://llhsvhuwwzuwbaulprka.supabase.co/storage/v1/object/public/shopping/${id}/${media[0]?.name}`}
                              className={style.image}
                              alt="avatar" /> : 
                              <img 
                              src={`https://llhsvhuwwzuwbaulprka.supabase.co/storage/v1/object/public/shopping/${id}/${media[media.length - 1]?.name}`}
                              className={style.image}
                              alt="avatar" />}

                    </div>
                </>
            }
        </>
    )
}

export default LoginWrapper