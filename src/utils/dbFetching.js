import { sql } from "@vercel/postgres";

export async function fetchLeagues(){
    let leagues = await sql`SELECT id, name, logo FROM leagues`
    return leagues.rows;
}

export async function fetchTeamsByLeague(leagueId){
    const teams = await sql`SELECT name, logo FROM teams WHERE league_id=${leagueId} ORDER BY name`;
    return teams.rows;
}

export async function fetchLeagueById(leagueId){
    let league = await sql`SELECT name, logo FROM leagues WHERE id=${leagueId}`
    return league.rows[0];
}