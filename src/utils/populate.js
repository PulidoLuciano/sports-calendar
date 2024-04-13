const {sql} = require("@vercel/postgres");
require("dotenv").config();

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

async function createUsersTable(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        await client.sql`CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            email VARCHAR(255) NOT NULL
        )`

        console.log("Created users table");
    }catch(error){
        console.error("Error creating users table: ", error);
    }
}

async function createSuscribeTable(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        await client.sql`CREATE TABLE IF NOT EXISTS suscribes (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            teamId UUID references teams(id),
            userId UUID references users(id)
        )`

        console.log("Created suscribe table");
    }catch(error){
        console.error("Error creating suscribe table: ", error);
    }
}

async function populateLeaguesTable(client){
    try{
        client.sql`DELETE FROM leagues`;
        
        let canContinue = true;
        for(let i = 0; i < LEAGUES.length; i++)
        {
            const initialDate = Date.now();
            while(!canContinue){
                if(Date.now() - initialDate > 70000)
                    canContinue = true;
            }
            const league = LEAGUES[i];
            let api = await fetch(`https://v3.football.api-sports.io/leagues?id=${league.apiId}&current=true`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
                    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
                }
            });
            api = await api.json();

            if(api.errors.length != 0){
                canContinue = false;
                i--;
                continue;
            }

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
        client.sql`DELETE FROM teams`

        let leagues = await client.sql`SELECT id,apiId,currentYear FROM leagues`;
        leagues = leagues.rows;
        let canContinue = true;
        for(let i = 0; i < leagues.length; i++)
        {
            const initialDate = Date.now();
            while(!canContinue){
                if(Date.now() - initialDate > 70000)
                    canContinue = true;
            }

            const league = leagues[i];
            let api = await fetch(`https://v3.football.api-sports.io/teams?league=${league.apiid}&season=${league.currentyear}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
                    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
                }
            });
            api = await api.json();

            if(api.errors.length != 0){
                canContinue = false;
                i--;
                console.log("Wait 70000ms");
                continue;
            }

            api = api.response;
            for(let j = 0; j < api.length; j++){
                let team = {
                    name: api[j].team.name,
                    apiId: api[j].team.id,
                    leagueId: leagues[i].id,
                }
                console.log(team);
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
    let client = await sql.connect();

    //CREATE TABLES
    await createLeaguesTable(client);
    await createTeamsTable(client);
    await createUsersTable(client);
    await createSuscribeTable(client);
    
    //POPULATE LEAGUE TABLE
    await populateLeaguesTable(client);
    await client.end();

    //POPULATE TEAMS TABLE
    client = await sql.connect();
    await populateTeamsTable(client);
    await client.end();
}

main();

const LEAGUES = [
    {
        apiId: 128,
        name: "Liga Profesional de Fútbol",
        logo: "/leagues/128.png",
    },
    {
        apiId: 129,
        name: "Primera B Nacional",
        logo: "/leagues/129.png",
    },
    {
        apiId: 71,
        name: "Brasileirão",
        logo: "/leagues/71.png",
    },
    {
        apiId: 39,
        name: "Premier League",
        logo: "/leagues/39.png",
    },
    {
        apiId: 140,
        name: "La Liga",
        logo: "/leagues/140.png",
    },
    {
        apiId: 135,
        name: "Serie A",
        logo: "/leagues/135.png",
    },
    {
        apiId: 78,
        name: "Bundesliga",
        logo: "/leagues/78.png",
    },
    {
        apiId: 61,
        name: "League One",
        logo: "/leagues/61.png",
    },
    {
        apiId: 30,
        name: "AFC",
        logo: "/leagues/30.png",
    },
    {
        apiId: 29,
        name: "CAF",
        logo: "/leagues/29.png",
    },
    {
        apiId: 32,
        name: "UEFA",
        logo: "/leagues/32.png",
    },
    {
        apiId: 34,
        name: "CONMEBOL",
        logo: "/leagues/34.png",
    },
    {
        apiId: 31,
        name: "CONCACAF",
        logo: "/leagues/31.png",
    },
    {
        apiId: 33,
        name: "OFC",
        logo: "/leagues/33.png",
    },
]
