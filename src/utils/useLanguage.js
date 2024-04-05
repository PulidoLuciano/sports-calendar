import { useState, useEffect } from "react";
import english from "./languages/english";
import spanish from "./languages/spanish";

export default function useLanguage(){
    const [language, setLanguage] = useState("en");
    const [text, setText] = useState(english);

    useEffect(() => {
        setLanguage(localStorage.getItem("language") ?? (LANGUAGES.includes(navigator.language.split("-")[0])) ? navigator.language.split("-")[0] : "en");
    }, [])

    useEffect(() => {
        setText((language == "en") ? english : spanish);
    }, [language]);

    function changeLanguage(newLanguage){
        setLanguage(newLanguage);
    }

    return {text, language, changeLanguage};
}

const LANGUAGES = ["en", "es"];