"use server"

import { prisma } from "@/lib/prisma"

export default async function GetAllDocuments(userId: string){
    const documents = await prisma.document.findMany({
        where:{
            userId: userId
        }
    });
    
    if(!documents){
        throw new Error("Документы не было найдены!");
    }

    return documents;
}