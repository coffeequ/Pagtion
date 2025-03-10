"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";

import { getUserByEmail } from "@/actions/user"
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


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

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Код подтверждения отправлен на почту!" };
}