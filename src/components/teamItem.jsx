"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TeamItem({name, logo, id}){ 
    const {data: session} = useSession();
    const [isSuscribe, setIsSuscribe] = useState(null);
    
    useEffect(() => {
        if(session)
        fetch(`/api/suscribe?user=${session.user.email}&team=${id}`).then((res) => res.json()).then((data) => {
            setIsSuscribe(data);
        })
    }, [session]);

    function handleClick(){
        setIsSuscribe(!isSuscribe)
        fetch(`/api/suscribe?user=${session.user.email}&team=${id}`, {
            method: "POST"
        })
    }

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
                    <button onClick={handleClick}>
                        {
                            (isSuscribe) ?
                            <img src="/starFill.svg" alt="Suscribe icon" />
                            :
                            <img src="/star.svg" alt="No suscribe icon" />
                        }
                    </button>  
                    :
                    null
                } 
            </article>
            <hr className="text-black dark:text-white"/>
        </>
    )
}