import { useEffect, useState } from "react";

export default function useTheme(){
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        setTheme(localStorage.getItem("theme") ?? (matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "");
    }, [])

    function changeTheme(){
        if(theme == "dark"){
            setTheme("");
            if(typeof window !== 'undefined')
                localStorage.setItem("theme", "");
        }
        else{
            setTheme("dark");
            if(typeof window !== 'undefined')
                localStorage.setItem("theme", "dark");
        }
    }

    return {theme, changeTheme};
}