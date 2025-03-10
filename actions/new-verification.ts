"use server"

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/actions/user";
import { getVerificationTokenByToken } from "@/actions/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return { error: "Токен не существует!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return { error: "Срок действия токена истёк!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return { error: "Email не существует!" };
    }

    await prisma.user.update({
        where: {
            id: existingUser?.id,
        },
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await prisma.verificationToken.delete({
        where:{
            id: existingToken.id
        }
    });

    return { success: "Почта подтверждена!" };
}