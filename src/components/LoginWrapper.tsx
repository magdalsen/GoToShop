import { Button } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext";

const LoginWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn, logOut}=useUserContext();
    console.log(isLoggedIn);
    
    return (
        <>
            {
                !isLoggedIn ? <>{children}</> :
                <>
                    <div>You are logged in.</div>
                    <Button colorScheme='blue' type="button" onClick={logOut}>Wyloguj</Button>
                </>
            }
        </>
    )
}

export default LoginWrapper