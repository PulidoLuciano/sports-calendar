"use server"

import { google } from "googleapis";
import { sql } from "@vercel/postgres";

export async function suscribe(_, formData){
    try{
        let userEmail = formData.get('email');
        let teamId = formData.get('teamId');
        
        const adminAuth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );
        adminAuth.setCredentials({
            refresh_token: process.env.ADMIN_REFRESH_TOKEN
        });
        const adminCalendar = google.calendar({version: "v3", auth: adminAuth});

        //Search suscribes with this user and this team
        let entries = await sql`SELECT id FROM suscribes WHERE userid=(SELECT id FROM users WHERE email=${userEmail}) AND teamid=${teamId}`;
        entries = entries.rows;

        //Do this suscribe exist?
        if(entries.length == 0){
            //Do this team calendar exist?
            let team = await sql`SELECT name, calendarid FROM teams WHERE id=${teamId}`;
            team = team.rows[0];
            let teamCalendar;
            
            //If not calendar created yet
            if(!team.calendarid){
                //Create calendar
                const calendarInfo = {
                    summary: team.name,
                    timeZone: "UTC"
                }
                const newCalendar = await adminCalendar.calendars.insert({resource: calendarInfo});
                teamCalendar = newCalendar.data.id;
                await sql`UPDATE teams SET calendarid=${teamCalendar} WHERE id=${teamId}`;
            }else{
                teamCalendar = team.calendarid;
            }
            
            //Create suscribe
            const aclInfo = {
                role: "reader",
                scope: {
                    type: "user",
                    value: userEmail,
                }
            }
            const newAcl = await adminCalendar.acl.insert({calendarId: teamCalendar, resource: aclInfo});
            await sql`INSERT INTO suscribes (userid, teamid, aclid) VALUES ((SELECT id FROM users WHERE email=${userEmail}), ${teamId}, ${newAcl.data.id})`;
            await updateTeamCalendar(teamId);
        }else{
            //Delete suscribe
            let deleteEntry = await sql`SELECT aclid, calendarid FROM suscribes JOIN teams ON teamid = teams.id WHERE suscribes.id=${entries[0].id}`;
            await sql`DELETE FROM suscribes WHERE id=${entries[0].id}`;
            deleteEntry = deleteEntry.rows[0];
            await adminCalendar.acl.delete({calendarId: deleteEntry.calendarid, ruleId: deleteEntry.aclid});
            //Check if there's users suscribe
            let teamSuscribes = await sql`SELECT id FROM suscribes WHERE teamId=${teamId}`;
            teamSuscribes = teamSuscribes.rows;
            if(teamSuscribes.length == 0){
                //There's not suscribers, delete calendar
                await adminCalendar.calendarList.delete({calendarId: deleteEntry.calendarid});
                await sql`UPDATE teams SET calendarid=NULL, modified=false WHERE id=${teamId}`;
            }
        }
    }catch(error){
        console.error(error);
    }
}

async function updateTeamCalendar(teamId){
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

