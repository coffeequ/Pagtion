"use server"

import { prisma } from "@/lib/prisma"

export async function removeSync(id: string, userId: string){

    const document = await prisma.document.findFirst({
        where:{
            id,
            userId
        }
    })

    if(!document){
        return null;
    }

    const deleteDocument = await prisma.document.delete({
        where:{
            id: document.id,
            userId: document.userId
        }
    });

    return deleteDocument;

}