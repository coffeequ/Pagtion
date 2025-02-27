"use server"

import { prisma } from "@/lib/prisma"

export default async function searchDocument(userId: string) {
    return await prisma.document.findMany({
        where:{
            userId,
            isArchived: false
        },
        orderBy:{
            id: "desc"
        }
    });
}