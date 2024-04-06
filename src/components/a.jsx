"use client"

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function A({text, className, href}){
    const languageContext = useContext(LanguageContext);

    return(
        <a className={className} href={href}>{languageContext.text[text]}</a>
    )
}