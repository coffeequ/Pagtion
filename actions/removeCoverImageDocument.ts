"use server"

import { prisma } from "@/lib/prisma"

export default async function removeCoverImageDocument(documentId: string, userId?: string){
    const existingDocument = await prisma.document.findFirst({
        where: {
            id: documentId,
            userId,
        }
    });

    if(!existingDocument){
        throw new Error("Не найдено");
    }

    const removeCoverImageDocument = await prisma.document.update({
        where: {
            id: existingDocument.id,
        },
        data: {
            coverImage: null
        }
    });

    return removeCoverImageDocument;
}