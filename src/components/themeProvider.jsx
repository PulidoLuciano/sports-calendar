"use client"

import { useState, createContext, useEffect } from "react"
import Header from "./header";
import useTheme from "@/utils/useTheme";

export const ThemeContext = createContext(null);

export default function ThemeProvider({children}){
    
    const {theme, changeTheme} = useTheme();

    return(
        <ThemeContext.Provider value={changeTheme}>
            <div id="root" className={`${theme}`}>
                <Header></Header>
                <main className={`bg-white dark:bg-black`}>
                    {children}
                </main>
            </div>
        </ThemeContext.Provider>
    )
}
