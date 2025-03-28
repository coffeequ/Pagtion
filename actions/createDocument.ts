"use server"

import { prisma } from "@/lib/prisma"

export async function createDocument(title: string, userId: string, parentDocumentId?: string) {
    const document = await prisma.document.create({
        data: {
            userId,
            title,
            parentDocumentId,
            isArchived: false,
            isPublished: false
        }
    });
    return document;
}