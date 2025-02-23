"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

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
    revalidatePath(`/`);
    return document;
}