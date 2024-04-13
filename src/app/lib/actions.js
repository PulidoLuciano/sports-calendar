"use server"
/*
//EJEMPLO PARA CREAR COSAS
export async function createRandomEvent(){
    
    AdminAuth.setCredentials({
        access_token: "ya29.a0Ad52N3_0sz9WgQPw7-Xo2vg85cXhuhsK4FsIssZZWp9PZ3NEykxynDTltKatHkOJO1dlhq7KG5Fau34ik-HPtEClXO-cvsoityY67d7ntGmiyiX1Fb84H0pMpx5zYdSDsxn-H3SvyfhK1hOcMla65wT3otPkV0JfqacqaCgYKAbwSARASFQHGX2MiD9WDonyQ4DwRZabnF4_EFg0171"
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

    adminCalendar.events.insert({calendarId: "7cb95c8c65787ba1d4d202dbfc1f326dcb94770d58f430fec25c0939d1684ba3@group.calendar.google.com", resource: newEvent});

    let newAcl = {
        role: "reader",
        scope: {
            type: "user",
            value: "lucianonicolaspulido@gmail.com"
        }
    }

    newAcl = await adminCalendar.acl.insert({calendarId: newCalendar.data.id, resource: newAcl});
}
*/

export async function suscribe(_, formData){
    let userEmail = formData.get('email');
    let teamId = formData.get('teamId');

    console.log(userEmail, teamId);
}


