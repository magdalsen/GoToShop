import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { useUserContext } from "../contexts/UserContext";

import style from './LoginWrapper.module.css';

const LoginWrapper = ({children}:{children:React.ReactNode}) => {
    const { isLoggedIn, logOut, email, avatar }=useUserContext();
    const queryClient = useQueryClient();
    const handleLogout = () => {
        queryClient.removeQueries();
    }
    return (
        <>
            {
                !isLoggedIn ? <>{children}</> :
                <>
                    <Link to={'/'}><Button colorScheme='blue' type="button" onClick={logOut} onChange={handleLogout}>Wyloguj</Button></Link>
                    <div>Witaj, {email}</div>
                    <div>
                        <img 
                          src={avatar}
                          className={style.image}
                          alt="avatar" />
                    </div>
                </>
            }
        </>
    )
}

export default LoginWrapper