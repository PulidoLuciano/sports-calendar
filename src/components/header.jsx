import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "./themeProvider";

export default function Header(){
    
    const themeContext = useContext(ThemeContext);

    function changeTheme(){
        themeContext();
    }
    
    return(
        <header className="bg-primary p-3 shadow-sm shadow-tertiary">
            <Link href={"/"} className="text-white font-extrabold select-none">SportsCalendar</Link>
            <button onClick={changeTheme}>Change theme</button>
        </header>
    )
}