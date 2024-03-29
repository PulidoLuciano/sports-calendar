import { useState } from "react";

export default function useTheme(){
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? (matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "");

    function changeTheme(){
        if(theme == "dark"){
            setTheme("");
            localStorage.setItem("theme", "");
        }
        else{
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        }
    }

    return {theme, changeTheme};
}