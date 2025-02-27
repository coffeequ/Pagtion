"use server"

import { prisma } from "@/lib/prisma"

export default async function trash(userId?: string) {
    const document = await prisma.document.findMany({
        where:{
            userId,
            isArchived: true
        },
    });

    return document;
}

