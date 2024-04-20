"use client"
import { suscribe } from "@/app/lib/actions.js";
import { userSuscribe } from "@/utils/dbFetching";
import { useSession } from "next-auth/react";
import { useFormState } from 'react-dom';
import { useEffect, useState } from "react";

export default function TeamItem({name, logo, id}){ 
    const {data: session} = useSession();
    const [errorMessage, dispatch] = useFormState(suscribe ,undefined);
    const [isSuscribe, setIsSuscribe] = useState(null);
    
    useEffect(() => {
        if(session)
        fetch(`/api/suscribe?user=${session.user.email}&team=${id}`).then((res) => res.json()).then((data) => {
            setIsSuscribe(data);
        })
    }, [session])

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
                    <form action={dispatch}>
                        <input type="text" className="hidden" value={id} name="teamId" readOnly={true}/>
                        <input type="text" className="hidden" value={session.user.email} name="email" readOnly={true}/>
                        <button onClick={() => { setIsSuscribe(!isSuscribe)}}>
                            {
                                (isSuscribe) ?
                                <img src="/starFill.svg" alt="Suscribe icon" />
                                :
                                <img src="/star.svg" alt="No suscribe icon" />
                            }
                        </button>  
                    </form>
                    :
                    null
                } 
            </article>
            <hr className="text-black dark:text-white"/>
        </>
    )
}