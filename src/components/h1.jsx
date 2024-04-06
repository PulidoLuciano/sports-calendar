"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H1({text}){
    const languageContext = useContext(LanguageContext);

    return(
        <h1>{languageContext.text[text]}</h1>
    )
}