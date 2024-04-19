/*const { updateTeamCalendar } = require('../app/lib/actions');
const {sql} = require('@vercel/postgres');
const {google} = require('googleapis');
require("dotenv").config();*/
import { sql } from "@vercel/postgres";
import { google } from "googleapis";
import { configDotenv } from "dotenv";

configDotenv();
updateAllTeams();

async function updateAllTeams(){
    let limit = 60;
    let teams = await sql`SELECT id FROM teams WHERE calendarid IS NOT NULL AND modified=false`;
    
    if(teams.rows.length == 0){
        await sql`UPDATE teams SET modified=false`;
        teams = await sql`SELECT id FROM teams WHERE calendarid IS NOT NULL AND modified=false`;
    }

    teams = teams.rows;

    limit = (teams.length >= 60) ? 60 : teams.length;

    for(let i = 0; i < limit; i++){
        updateTeamCalendar(teams[i].id);
        await sql`UPDATE teams SET modified=true WHERE id=${teams[i].id}`;
        console.log(`Updated team ${teams[i].id}`);
    }
}

async function deleteAllEvents(calendarid, adminCalendar){
    let events = await adminCalendar.events.list({calendarId: calendarid});

    events = events.data.items;

    for(let i = 0; i < events.length; i++){
        await adminCalendar.events.delete({ calendarId: calendarid, eventId: events[i].id});
    }
}

export async function updateTeamCalendar(teamId){
    const adminAuth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );
    adminAuth.setCredentials({
        refresh_token: process.env.ADMIN_REFRESH_TOKEN
    });
    const adminCalendar = google.calendar({version: "v3", auth: adminAuth});

    const teamIds = await sql`SELECT calendarid, apiid FROM teams WHERE id=${teamId}`;

    const { calendarid, apiid } = teamIds.rows[0];

    deleteAllEvents(calendarid, adminCalendar);

    let api = await fetch(`https://v3.football.api-sports.io/fixtures?team=${apiid}&next=99`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
            "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
        }
    });
    api = await api.json();

    if(api.errors.length != 0) return;

    api = api.response;

    let events = [];

    for(let i = 0 ; i < api.length ; i++){
        let newMatch = {
            summary: `${api[i].teams.home.name} v. ${api[i].teams.away.name}`,
            description: `${api[i].league.name}`,
            start: {
                dateTime: `${api[i].fixture.date}`
            },
            end: {
                dateTime: finalDate(api[i].fixture.timestamp)
            }
        }
        events.push(newMatch);
    }

    for(let i = 0; i < events.length; i++){
        await adminCalendar.events.insert({calendarId: calendarid, resource: events[i]});
    }
}

function finalDate(timestamp){
    let date = new Date(timestamp * 1000 + 7200000);
    return date.toISOString();
}