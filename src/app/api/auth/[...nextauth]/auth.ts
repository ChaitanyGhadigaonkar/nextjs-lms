import { AuthOptions, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/db/db";

// TODO: Implement Email Password Authentication using Next Js

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
      async authorize(credentials) {
        const isExists = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!isExists) {
          return null;
        }

        const isMatched = await bcrypt.compare(
          credentials?.password as string,
          isExists?.password as string
        );

        if (!isMatched) {
          return null;
        }
        const user = {
          email: isExists.email,
          name: isExists.name,
          id: isExists.id,
          image: isExists.image,
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
