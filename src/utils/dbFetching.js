import { sql } from "@vercel/postgres";

export async function fetchLeagues(){
    let leagues = await sql`SELECT id, name, logo FROM leagues`
    return leagues.rows;
}