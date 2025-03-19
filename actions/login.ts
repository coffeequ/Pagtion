"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "./user";
import { sendVerificationEmail } from "@/lib/mail";

export default async function login(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return { error: "Не правильно заполнены поля!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "Аккаунт с почтой не зарегистрирован!!" }
    }
    
    //TO-DO: Спросить, нужна ли вообще подтверждение почты или нет?
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        
        return {success: "Письмо с подверждением отправлено!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        
        return { success: "Код отправлен на почту" }

    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Не правильный пароль!" }
                default:
                    return { error: "Что-то пошло нет так!" }
            }
        }
        throw error;
    }
}