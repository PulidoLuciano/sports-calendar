"use client"
import { suscribe } from "@/app/lib/actions.js";
import { useSession } from "next-auth/react";
import { useFormState } from 'react-dom';

export default function TeamItem({name, logo, id}){ 
    const {data: session} = useSession();
    const [errorMessage, dispatch] = useFormState(suscribe ,undefined);
    
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
                        <button>
                            Suscribe
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