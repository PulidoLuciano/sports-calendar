"use server"

import { sql } from "@vercel/postgres";

/*
//EJEMPLO PARA CREAR COSAS
export async function createRandomEvent(){
    
    AdminAuth.setCredentials({
        access_token: access_token
    })
    
    const adminCalendar = google.calendar({version: "v3", auth: AdminAuth});

    let newCalendar = {
        summary: "Test",
    }

    newCalendar = await adminCalendar.calendars.insert({resource: newCalendar});

    let newEvent = {
        summary: "Test Event 2",
        description: "Hello this is a test event",
        start: {
            date: "2024-04-09"
        },
        end: {
            date: "2024-04-09"
        }
    }

    adminCalendar.events.insert({calendarId: calendarId, resource: newEvent});

    let newAcl = {
        role: "reader",
        scope: {
            type: "user",
            value: "user@gmail.com"
        }
    }

    newAcl = await adminCalendar.acl.insert({calendarId: newCalendar.data.id, resource: newAcl});
}
*/

export async function suscribe(_, formData){
    try{
        let userEmail = formData.get('email');
        let teamId = formData.get('teamId');
    
        let entries = await sql`SELECT id FROM suscribes WHERE userid=(SELECT id FROM users WHERE email=${userEmail}) AND teamid=${teamId}`;
        entries = entries.rows;

        if(entries.length == 0){
            await sql`INSERT INTO suscribes (userid, teamid) VALUES ((SELECT id FROM users WHERE email=${userEmail}), ${teamId})`;
        }else{
            await sql`DELETE FROM suscribes WHERE id=${entries[0].id}`;
        }
        
    }catch(error){
        console.error(error);
    }
}


