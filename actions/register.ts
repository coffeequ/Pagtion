"use server"

import * as z from "zod";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";

import { getUserByEmail } from "@/actions/user"

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


    return { success: "Аккаунт был создан!" };
    
}