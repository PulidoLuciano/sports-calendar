import P from "./p";

export default function Footer(){
    return(
        <footer className="bg-tertiary text-white flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-2">
                <P text={"made"} className={"text-white py-6"}/>
                <a href="https://github.com/PulidoLuciano" target="_blank" referrerPolicy="non-referrer" className="underline">Luciano Pulido</a>
            </div>
            <P text={"copyright"} className={"text-white py-6 text-center"}/>
        </footer>
    )
}