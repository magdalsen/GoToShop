import { useContext } from "react"

import { UserContext } from "./UserContext"

export const useThemeContext=()=>{
    const ctx=useContext(UserContext)

    if(!ctx){ // poza komponentem zwróci nulla
        throw new Error("Missing Context, it's not wrapped in Provider")
    }
    return ctx
}