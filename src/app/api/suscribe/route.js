import { suscribe } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    let userEmail = searchParams.get("user");
    let teamId = searchParams.get("team");
    let user = await sql`SELECT id FROM users WHERE email=${userEmail}`;
    let suscribe = await sql`SELECT id FROM suscribes WHERE teamid=${teamId} AND userid=${user.rows[0].id}`;

    return Response.json((suscribe.rowCount > 0));
}

export async function POST(request){
    const { searchParams } = new URL(request.url);
    let userEmail = searchParams.get("user");
    let teamId = searchParams.get("team");
    suscribe(userEmail, teamId);
    return Response.json({suscribeDone: true});
}