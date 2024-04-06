"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function P({text, className}){
    const languageContext = useContext(LanguageContext);

    return(
        <p className={className}>{languageContext.text[text]}</p>
    )
}