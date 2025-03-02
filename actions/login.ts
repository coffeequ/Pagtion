"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export default async function login(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Не правильно заполнены поля!" };
    }

    const { email, password } = validatedFields.data;

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
                    return { error: "Ошибка доступа" }
                default:
                    return { error: "Что-то пошло нет так!" }
            }
        }
        throw error;
    }
}