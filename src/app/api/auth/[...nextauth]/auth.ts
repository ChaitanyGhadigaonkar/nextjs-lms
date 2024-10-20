import { AuthOptions, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      id: "with-email-password",
      name: "Email and Password",
      authorize(credentials) {
        const user = {
          id: "42",
          name: credentials?.name,
          email: "abc@gmail.com",
          password: "nextauth",
        };
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          console.log("success");
          return user;
        } else {
          console.log("failed");
          return null;
        }
      },
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter Full Name.",
        },
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
