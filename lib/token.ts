"use server"
import { v4 as uuidv4 } from "uuid"

import { prisma } from "@/lib/prisma"
import { getVerificationTokenByEmail } from "@/actions/verification-token";
import { getPasswordResetTokenByEmail } from "@/actions/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
        await prisma.passwordIdResetToken.delete({
            where:{
                id: existingToken.id
            }
        }); 
    }
    
    const passwordIdResetToken = await prisma.passwordIdResetToken.create({
        data:{
            email,
            token,
            expires
        }
    });
    return passwordIdResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}