"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H3({text, className}){
    const languageContext = useContext(LanguageContext);

    return(
        <h3 className={className}>{languageContext.text[text]}</h3>
    )
}