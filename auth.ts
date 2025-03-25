import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events:{
    async linkAccount({ user }){
      await prisma.user.update({
        where:{
          id: user.id,
        },
        data:{
          emailVerified: new Date(),
        }
      });
    }
  },
  callbacks: {
    async signIn({ user, account }){

      //Вход через сторонние провайдеры (google и тд)
      if(account?.provider !== "credentials"){
        return true;
      }

      const existingUser = await getUserById(user.id!);
      
      //предотвращать вход без подтверждения почты
      if(!existingUser?.emailVerified){
        return false;
      }
      
      return true;
    },
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
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  ...authConfig
});