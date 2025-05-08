import NextAuth, { type DefaultSession } from "next-auth";
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
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.profileSetup = token.profileSetup;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existUser = await getUserById(token.sub);
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