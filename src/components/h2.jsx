"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H2({text}){
    const languageContext = useContext(LanguageContext);

    return(
        <h2>{languageContext.text[text]}</h2>
    )
}