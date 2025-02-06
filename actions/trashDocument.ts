"use client"

import { prisma } from "@/lib/prisma"

export default async function trash(userId: string) {
    return await prisma.document.findMany({
        where:{
            userId,
            isArchived: true
        },
        orderBy:{
            parentDocumentId: "desc"
        }
    });
}

