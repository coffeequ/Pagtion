import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }){
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      return token;
    }
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  ...authConfig
});