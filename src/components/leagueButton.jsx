import Link from "next/link";

export default function LeagueButton({name, logo, id}){
    return(
        <article className="mt-4">
            <Link href={`/${id}`} className="flex flex-col items-center"> 
                <div className="w-64 mb-1 p-4 bg-tertiary bg-opacity-50 lg:opacity-80 lg:hover:opacity-100 rounded-3xl sm:w-72">
                    <img src={logo} alt={`${name} logo`} className="max-h-60 mx-auto sm:max-h-64"/>
                </div>
                <p className="font-semibold">{name}</p>
            </Link>
        </article>
    )
}