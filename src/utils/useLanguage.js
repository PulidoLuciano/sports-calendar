import { useState, useEffect } from "react";
import english from "./languages/english";
import spanish from "./languages/spanish";

export default function useLanguage(){
    const [language, setLanguage] = useState("en");
    const [text, setText] = useState(english);

    useEffect(() => {
        let storedLanguage = localStorage.getItem("lang");
        if(storedLanguage){
            setLanguage(storedLanguage);
        }else{ 
            let navigatorLanguage = (navigator.language == "es") ? "es" : "en"
            setLanguage(navigatorLanguage);
            localStorage.setItem("lang", navigatorLanguage);
        }
    }, []);

    useEffect(() => {
        setText((language == "en") ? english : spanish);       
    }, [language]);

    function changeLanguage(newLanguage){
        setLanguage(newLanguage);
        localStorage.setItem("lang", newLanguage);
    }

    return {text, language, changeLanguage};
}

const LANGUAGES = ["en", "es"];