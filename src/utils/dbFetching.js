import { sql } from "@vercel/postgres";

export async function fetchLeagues(){
    let leagues = await sql`SELECT id, name, logo FROM leagues`
    return leagues.rows;
}

export async function fetchTeamsByLeague(leagueId){
    const teams = await sql`SELECT name, logo, id FROM teams WHERE league_id=${leagueId} ORDER BY name`;
    return teams.rows;
}

export async function fetchLeagueById(leagueId){
    let league = await sql`SELECT name, logo FROM leagues WHERE id=${leagueId}`
    return league.rows[0];
}

export async function userSuscribe(teamId, userEmail){
    let user = await sql`SELECT id FROM users WHERE email=${userEmail}`;
    let suscribe = await sql`SELECT id FROM suscribes WHERE teamid=${teamId} AND userid=${user.rows[0].id}`;
    return (suscribe.rowCount > 0);
}