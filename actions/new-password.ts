"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "./password-reset-token";
import { getUserByEmail } from "./user"
import { prisma } from "@/lib/prisma";


export const newPassword = async(values: z.infer<typeof NewPasswordSchema>, token: string) => {
    if(!token){
        return { error: "Токен отсутствует!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Неверное поле!" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return { error: "Неверный токен!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return { error: "Истек срок действия токена!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingToken){
        return { error: "Почты не существует!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {
            id: existingUser?.id,
        },
        data:{
            password: hashedPassword
        }
    });

    await prisma.passwordIdResetToken.delete({
        where: {
            id: existingToken.id
        }
    })
    return { success: "Пароль был обновлен!" };
}