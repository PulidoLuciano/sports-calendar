import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {sql} from "@vercel/postgres";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                let email = user.email;
                let entry = await sql`SELECT * FROM users WHERE email=${email}`;
                if(entry.rows.length == 0)
                    await sql`INSERT INTO users (email) VALUES (${email})`;

            }
            return token
        }
    }
})

export { handler as GET, handler as POST }