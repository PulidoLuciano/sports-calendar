import P from "./p";

export default function Footer(){
    return(
        <footer className="bg-tertiary text-white flex justify-center gap-2 items-center">
            <P text={"made"} className={"text-white py-6"}/>
            <a href="https://github.com/PulidoLuciano" target="_blank" referrerPolicy="non-referrer" className="underline">Luciano Pulido</a>
        </footer>
    )
}