import { AuthOptions, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/db/db";

const authOptions: AuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile: (profile, tokens) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
    Credentials({
      id: "with-email-password",
      name: "Email and Password",
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = {
          email: credentials.email,
          password: credentials.password,
          id: "",
        };
        return user;
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Email.",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
    }),
  ],
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
