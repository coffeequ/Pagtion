"use server"

import { prisma } from "@/lib/prisma"

export async function archived(documentId: string, userId: string) {
    const existDocument = await prisma.document.findFirst({
        where:{
            id: documentId
        }
    });

    if(!existDocument){
        throw new Error("Не найден");
    }

    if(existDocument.userId !== userId){
        throw new Error("Доступ не разрешен");
    }

    async function recursiveArchive(documentId: string){
        await prisma.document.update({
            where: { id: documentId },
            data: { isArchived: true }
        });

        const children = await prisma.document.findMany({
            where: {
                parentDocumentId: documentId
            }
        });

        for(const child of children){
            await recursiveArchive(child.id);
        }
    }

    await recursiveArchive(existDocument.id);
}