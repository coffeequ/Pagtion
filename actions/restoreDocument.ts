"use server"

import { prisma } from "@/lib/prisma"

export default async function restore(documentId: string, userId?: string) {
    const existingDocument = await prisma.document.findFirst({
        where:{
            id: documentId,
            userId
        }
    });

    if(!existingDocument){
        throw new Error("Документ не найден");
    }

    if(existingDocument.userId !== userId){
        throw new Error("Доступ не разрешен");
    }

    async function recursiveRestore(documentId: string){
        await prisma.document.update({
            where:{
                id: documentId,
            },
            data:{
                isArchived: false
            }
        });

        const children = await prisma.document.findMany({
            where: {
                parentDocumentId: documentId
            }
        });

        for(const child of children){
            await recursiveRestore(child.id);
        }
    }

    await recursiveRestore(existingDocument.id);

    const recursiveDocuments = await prisma.document.findMany({
        where:{
            userId,
            isArchived: false
        }
    });
    
    return recursiveDocuments;
}