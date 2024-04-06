"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H2({text, className}){
    const languageContext = useContext(LanguageContext);

    return(
        <h2 className={className}>{languageContext.text[text]}</h2>
    )
}