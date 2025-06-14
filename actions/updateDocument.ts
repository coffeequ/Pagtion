"use server"

import { prisma } from "@/lib/prisma"

interface IUpdateProps {
    documentId: string,
    userId?: string,
    title?: string,
    content?: string,
    coverImage?: string,
    icon?: string,
    isPublished?: boolean,
    isArchived?: boolean
}

export default async function update({ documentId, userId, title, content, coverImage, icon, isPublished, isArchived } : IUpdateProps){
    const exsitingDocument = await prisma.document.findFirst({
        where:{
            userId,
            id: documentId,
        }
    });
    
    if(!exsitingDocument){
        throw new Error("Не найдено");
    }

    const updateDocument = await prisma.document.update({
        where:{
            id: documentId,
            userId
        },
        data:{
            title,
            content,
            coverImage,
            icon,
            isPublished,
            isArchived
        }
    });
    return updateDocument;
}