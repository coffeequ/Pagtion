"use server"

import { prisma } from "@/lib/prisma"

export async function exist(id: string, userId: string){
    const document = await prisma.document.findFirst({
        where:{
            id,
            userId
        }
    });

    return document;
}