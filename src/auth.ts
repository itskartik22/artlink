import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./lib/getUserById";
import { prisma } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profileSetup = token.profileSetup as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      console.log("jwt token", token);
      if (!token.sub) return token;
      const existUser = await getUserById(token.sub);
      console.log("existUser", existUser);
      if (existUser) {
        token.id = existUser.id;
        token.role = existUser.role;
        token.profileSetup = existUser.profileSetup;
      }
      return token;
    },
  },
  // adapter: MongoDBAdapter(client),
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});