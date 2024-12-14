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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account && account.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: token.email! },
        });
        if (!existingUser) {
          const newUser = await db.user.create({
            data: {
              email: token.email!,
              name: token.name!,
              image: token.picture,
            },
          });
          token.id = newUser.id;
        } else {
          token.id = existingUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
