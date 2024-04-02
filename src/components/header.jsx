import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "./themeProvider";

export default function Header(){
    
    const themeContext = useContext(ThemeContext);

    function changeTheme(){
        themeContext.changeTheme();
    }
    
    return(
        <header className="bg-primary md:px-16 p-3 shadow-sm shadow-tertiary flex items-center justify-between">
            <Link href={"/"} className="text-white font-extrabold select-none">SportsCalendar</Link>
            <button onClick={changeTheme}><img src={(themeContext.theme == "") ? "./lightmode.svg" : "./darkmode.svg"} alt={`${themeContext.theme} theme logo`} className="invert"/></button>
        </header>
    )
}