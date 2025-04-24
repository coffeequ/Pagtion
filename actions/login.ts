"use server"
import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./user";

export default async function login(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return { error: "Не правильно заполнены поля!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "Аккаунт с почтой не зарегистрирован!" }
    }
    
    try {
        await signIn("credentials", {
            email,
            password
        })

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