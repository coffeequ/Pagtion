"use server"

import { prisma } from "@/lib/prisma"

export default async function removeIcon(documentId: string, userId?: string){
    const existingDocument = await prisma.document.findFirst({
        where:{
            id: documentId,
            userId
        }
    });

    if(!existingDocument){
        throw new Error("Не найдено");
    }

    const removeIconDocument = await prisma.document.update({
        where: {
            id: existingDocument.id
        },
        data: {
            icon: null
        }
    });

    return removeIconDocument;
}