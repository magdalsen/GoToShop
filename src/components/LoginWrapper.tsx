import { Button } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const LoginWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn, logOut}=useUserContext();
    return (
        <>
            {
                !isLoggedIn ? <>{children}</> :
                <>
                    <Link to={'/'}><Button colorScheme='blue' type="button" onClick={logOut}>Wyloguj</Button></Link>
                </>
            }
        </>
    )
}

export default LoginWrapper