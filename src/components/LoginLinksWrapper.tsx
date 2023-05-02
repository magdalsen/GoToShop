
import { useUserContext } from "../contexts/UserContext";

const LoginLinksWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn}=useUserContext();
    return (
        <>
            {
                isLoggedIn ? <>{children}</> : <></>
            }
        </>
    )
}

export default LoginLinksWrapper