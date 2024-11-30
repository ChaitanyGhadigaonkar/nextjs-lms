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
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
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
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              // githubId: user.id,
            },
          });
        }
      }
      return true;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
