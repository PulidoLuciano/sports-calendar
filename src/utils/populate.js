const {sql} = require("@vercel/postgres");
require("dotenv").config();

async function createUsersTable(){
    sql`CREATE TABLE IF NOT EXIST users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY_KEY,
        name VARCHAR(50) NOT NULL,

    )`
}

async function createLeaguesTable(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        await client.sql`CREATE TABLE IF NOT EXISTS leagues (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            logo VARCHAR(255),
            apiId INT NOT NULL,
            currentYear INT NOT NULL
        )`

        console.log("Created leagues table");
    }catch(error){
        console.error("Error creating leagues table: ", error);
    }
}

async function createTeamsTable(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        await client.sql`CREATE TABLE IF NOT EXISTS teams (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            logo VARCHAR(255),
            apiId INT NOT NULL,
            league_id UUID NOT NULL
        )`

        console.log("Created teams table");
    }catch(error){
        console.error("Error creating leagues table: ", error);
    }
}

function createSuscribeTable(){
    
}

async function populateLeaguesTable(client){
    try{
        for(let i = 0; i < LEAGUES.length; i++)
        {
            const league = LEAGUES[i];
            let api = await fetch(`https://v3.football.api-sports.io/leagues?id=${league.apiId}&current=true`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
                    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
                }
            });
            api = await api.json();

            await client.sql`INSERT INTO leagues (name, apiId, currentYear, logo)
                VALUES (${league.name}, ${league.apiId}, ${api.response[0].seasons[0].year}, ${league.logo})`;
        }
        console.log("League table populated successfully");
    }catch(error){
        console.error("Error populating leagues table: ", error);
    }
}

async function populateTeamsTable(client){
    try{
        let leagues = await client.sql`SELECT id,apiId,currentYear FROM leagues`;
        leagues = leagues.rows;
        for(let i = 0; i < leagues.length; i++)
        {
            const league = leagues[i];
            let api = await fetch(`https://v3.football.api-sports.io/standings?league=${league.apiid}&season=${league.currentyear}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
                    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
                }
            });
            api = await api.json();
            api = api.response[0].league.standings[0];
            for(let j = 0; j < api.length; j++){
                let team = {
                    name: api[j].team.name,
                    apiId: api[j].team.id,
                    leagueId: league.id,
                }
                await client.sql`INSERT INTO teams (name, apiId, league_id)
                    VALUES (${team.name}, ${team.apiId}, ${team.leagueId})`;
            }
        }
        console.log("Teams populated successfully");
    }catch(error){
        console.error("Error populating teams table: ", error);
    }
}

async function main(){
    const client = await sql.connect();

    //CREATE TABLES
    await createLeaguesTable(client);
    await createTeamsTable(client);
    
    //POPULATE TABLES
    //await populateLeaguesTable(client);
    await populateTeamsTable(client);
    
    await client.end();
}

main();

const LEAGUES = [
    {
        apiId: 128,
        name: "Liga Profesional de Fútbol",
        logo: "/leagues/128",
    },
    {
        apiId: 129,
        name: "Primera B Nacional",
        logo: "/leagues/129",
    },
    {
        apiId: 71,
        name: "Brasileirão",
        logo: "/leagues/71",
    },
    {
        apiId: 39,
        name: "Premier League",
        logo: "/leagues/39",
    },
    {
        apiId: 140,
        name: "La Liga",
        logo: "/leagues/140",
    },
    {
        apiId: 135,
        name: "Serie A",
        logo: "/leagues/135",
    },
    {
        apiId: 78,
        name: "Bundesliga",
        logo: "/leagues/78",
    },
    {
        apiId: 61,
        name: "League One",
        logo: "/leagues/61",
    },
    {
        apiId: 30,
        name: "AFC",
        logo: "/leagues/30",
    },
    {
        apiId: 29,
        name: "CAF",
        logo: "/leagues/29",
    },
    {
        apiId: 32,
        name: "UEFA",
        logo: "/leagues/32",
    },
    {
        apiId: 34,
        name: "CONMEBOL",
        logo: "/leagues/34",
    },
    {
        apiId: 31,
        name: "CONCACAF",
        logo: "/leagues/31",
    },
    {
        apiId: 33,
        name: "OFC",
        logo: "/leagues/33",
    },
]

const fakeResponse = {
    get: "standings",
    parameters: {
    },
    errors: [
    ],
    results: 1,
    paging: {
    },
    response: [
    {
    league: {
    id: 39,
    name: "Premier League",
    country: "England",
    logo: "https://media.api-sports.io/football/leagues/39.png",
    flag: "https://media.api-sports.io/flags/gb.svg",
    season: 2023,
    standings: [
    [
    {
    rank: 1,
    team: {
    id: 42,
    name: "Arsenal",
    logo: "https://media.api-sports.io/football/teams/42.png"
    },
    points: 64
    }]]}}]}