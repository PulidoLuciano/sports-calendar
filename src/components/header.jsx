"use client"

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "./themeProvider";
import { LanguageContext } from "./LanguageProvider";

export default function Header(){
    
    const themeContext = useContext(ThemeContext);
    const languageContext = useContext(LanguageContext);

    function changeTheme(){
        themeContext.changeTheme();
    }

    function changeLanguage(){
        languageContext.changeLanguage((languageContext.language == "en") ? "es" : "en");
    }
    
    return(
        <header className="bg-primary md:px-16 p-3 shadow-sm shadow-tertiary flex items-center justify-between sticky top-0 left-0 z-50">
            <Link href={"/"} className="text-white font-extrabold select-none">SportsCalendar</Link>
            <div className="flex gap-4">
                <button onClick={changeTheme}><img src={(themeContext.theme == "") ? "./lightmode.svg" : "./darkmode.svg"} alt={`${themeContext.theme} theme logo`} className="invert"/></button>
                <button onClick={changeLanguage}><img src={(languageContext.language == "en") ? "./britain.svg" : "./spain.svg"} alt={`${languageContext.language} flag`} className="h-5"/></button>
            </div>
        </header>
    )
}