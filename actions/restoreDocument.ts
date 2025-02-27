"use server"

import { prisma } from "@/lib/prisma"

async function recursiveRestore(documentId: string) {
    await prisma.document.update({
        where: {
            id: documentId,
        },
        data: {
            isArchived: false
        }
    });

    const children = await prisma.document.findMany({
        where: {
            parentDocumentId: documentId
        }
    });

    for (const child of children) {
        await recursiveRestore(child.id);
    }
}

export default async function restore(documentId: string, userId: string) {
    const existingDocument = await prisma.document.findFirst({
        where: {
            id: documentId,
            userId
        }
    });

    if (!existingDocument) {
        throw new Error("Документ не найден");
    }

    if (existingDocument.userId !== userId) {
        throw new Error("Доступ не разрешен");
    }

    let updateData: any = { isArchived: false };

    if (existingDocument.parentDocumentId) {
        const parent = await prisma.document.findFirst({
            where: { id: existingDocument.parentDocumentId }
        });

        if (parent?.isArchived) {
            updateData.parentDocumentId = null;
        }
    }

    await prisma.document.update({
        where: { id: existingDocument.id },
        data: updateData
    });

    await recursiveRestore(existingDocument.id);

    return await prisma.document.findMany({
        where: {
            userId,
            isArchived: false
        }
    });
}