"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H1({text, className}){
    const languageContext = useContext(LanguageContext);

    return(
        <h1 className={className}>{languageContext.text[text]}</h1>
    )
}