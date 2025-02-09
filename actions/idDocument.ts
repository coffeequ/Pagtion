"use server"

import { prisma } from "@/lib/prisma"

export default async function getId(documentId: string, userId?: string) {
    const existingDocument = await prisma.document.findFirst({
        where:{
            id: documentId,
        }
    });

    if(!existingDocument){
        throw new Error("Не найдено");
    }
    
    if(existingDocument.isPublished && !existingDocument.isArchived){
        return existingDocument;
    }

    if(existingDocument.userId !== userId){
        throw new Error("Пользователь не авторизован");
    }

    return existingDocument;
}