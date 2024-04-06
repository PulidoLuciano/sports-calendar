"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function H3({text}){
    const languageContext = useContext(LanguageContext);

    return(
        <h3>{languageContext.text[text]}</h3>
    )
}