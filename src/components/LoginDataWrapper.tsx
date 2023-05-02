
import { useUserContext } from "../contexts/UserContext";

const LoginDataWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn}=useUserContext();
    return (
        <>
            {
                isLoggedIn ? <>{children}</> : <>Musisz się najpierw zalogować.</>
            }
        </>
    )
}

export default LoginDataWrapper