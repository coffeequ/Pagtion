"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";

import { getUserByEmail } from "@/actions/user"
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";


export default async function register(values: z.infer<typeof RegisterSchema>){
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Не правильно заполнены поля!" };
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return { error: "Почта уже используется" };
    }

    await prisma.user.create({
        data:{
            email,
            name,
            password: hashedPassword
        }
    });

    
    try {
        await signIn("credentials", {
            email,
            name,
            hashedPassword,
        })

    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Ошибка доступа" }
                default:
                    return { error: "Упс, что-то пошло не так!" }
            }
        }   
    }

    return { success: "Аккаунт был создан!" };
}