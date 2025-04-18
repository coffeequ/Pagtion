import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Yandex from "next-auth/providers/yandex"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./actions/user";
import bcrypt from "bcryptjs"
 
export default { providers:
  [
    Credentials({
      async authorize(credentials){
        const validateFields = LoginSchema.safeParse(credentials);

        if(validateFields.success){
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if(passwordMatch) return user;
        }

        return null;
      }
    }),
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    })
]
} satisfies NextAuthConfig