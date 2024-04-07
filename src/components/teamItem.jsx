"use client"
import { useSession } from "next-auth/react"

export default function TeamItem({name, logo}){ 
    const {data: session} = useSession();
    
    return(
        <>
            <article className="flex p-2 items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={(logo) ? logo : "/default.webp"} alt={(logo) ? `${name} logo` : "Default logo"} className="size-8" />
                    <p>{name}</p>
                </div>
                {
                    (session) 
                    ?
                    <button>
                    <img src="/copy.svg" alt="Copy icon" className="dark:invert"/>
                    </button>
                    :
                    null
                } 
            </article>
            <hr className="text-black dark:text-white"/>
        </>
    )
}