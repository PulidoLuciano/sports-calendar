"use client"

import useLanguage from "@/utils/useLanguage";
import { createContext } from "react";

export const LanguageContext = createContext(null);

export default function LanguageProvider({children}){
    
    const {text, language, changeLanguage} = useLanguage();

    return(
        <>
            <LanguageContext.Provider value={{text, language, changeLanguage}}>
                {children}
            </LanguageContext.Provider>
        </>
    )
}