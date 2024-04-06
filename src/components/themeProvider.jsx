"use client"

import {createContext} from "react"
import Header from "@/components/header";
import useTheme from "@/utils/useTheme";

export const ThemeContext = createContext(null);

export default function ThemeProvider({children}){
    
    const {theme, changeTheme} = useTheme();

    return(
        <ThemeContext.Provider value={{theme, changeTheme}}>
            <div id="root" className={`${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
