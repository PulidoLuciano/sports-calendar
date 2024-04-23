import { suscribe } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";

export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        let userEmail = searchParams.get("user");
        let teamId = searchParams.get("team");
        userEmail = userEmail.replace("%40", "@");
        let user = await sql`SELECT id FROM users WHERE email=${userEmail}`;
        let suscribes = await sql`SELECT id FROM suscribes WHERE teamid=${teamId} AND userid=${user.rows[0].id}`;
    
        return Response.json((suscribes.rowCount > 0));
    }catch(e){
        console.log(e);
        return Response.json(e);
    }
}

export async function POST(request){
    const { searchParams } = new URL(request.url);
    let userEmail = searchParams.get("user");
    let teamId = searchParams.get("team");
    console.log({userEmail, teamId});
    suscribe(userEmail, teamId);
    return Response.json({suscribeDone: true});
}