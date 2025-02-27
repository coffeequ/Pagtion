"use server"

import { prisma } from "@/lib/prisma";

export default async function sidebar(userId: string, parentDocumentId?: string) {
    return await prisma.document.findMany({
        where: {
            parentDocumentId: parentDocumentId ?? null,
            isArchived: false,
            userId
        },
    });
}