"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function P({text}){
    const languageContext = useContext(LanguageContext);

    return(
        <p>{languageContext.text[text]}</p>
    )
}