"use server"

import { prisma } from "@/lib/prisma";

export default async function sidebar(parentDocumentId? : string, userId?: string) {
    return await prisma.document.findMany({
        where: {
            parentDocumentId: parentDocumentId ?? null,
            isArchived: false,
            userId
        },
    });
}