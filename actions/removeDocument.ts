"use server"

import { prisma } from "@/lib/prisma"

export default async function remove(documentId: string, userId?: string) {
    const existingDocument = await prisma.document.findFirst({
        where: {
            id: documentId,
            userId,
        }
    });

    if(!existingDocument){
        throw new Error("Не найдено");
    }

    const removeDocument = await prisma.document.delete({
        where: {
            id: existingDocument.id,
            userId: existingDocument.userId
        }
    });

    return removeDocument;
}