import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";

import Credentials from "next-auth/providers/credentials";
import { authenticateUserData } from "./src/lib/server-actions";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

  return {
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    providers: [
      Google,
      GitHub,
      Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials: { email: string; password: string }) => {
          try {
            let email = credentials.email.toLowerCase();

            let user = null;
            // logic to verify if the user exists
            user = await authenticateUserData(email, credentials.password);

            if (!user) {
              throw new Error("user not found!");
            }

            // return user object with their profile data
            return user;
          } catch (error) {
            console.error("login failed, check email or password: ", error);
          }
        },
      }),
    ],
  };
});
