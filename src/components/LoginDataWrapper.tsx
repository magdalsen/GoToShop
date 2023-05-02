
import { useUserContext } from "../contexts/UserContext";

const LoginDataWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn}=useUserContext();
    return (
        <>
            {
                isLoggedIn ? <>{children}</> :
                <>

                </>
            }
        </>
    )
}

export default LoginDataWrapper