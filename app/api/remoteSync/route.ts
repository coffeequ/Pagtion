import { createDocument } from "@/actions/createDocument";
import remove from "@/actions/removeDocument";
import update from "@/actions/updateDocument";
import { Document } from "@prisma/client";

export async function POST(req: Request){

    try {
        const data: Document = await req.json();
        
        console.log(data.id);

        const document = await createDocument(
            data.title,
            data.userId,
            data.parentDocumentId === null ? undefined : data.parentDocumentId,
            data.id
        );

        const body = {message: `Заметка: ${document.id} была успешно создана!`};

        return new Response(JSON.stringify(body), {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }

}

export async function PUT(req: Request){

    try {
        const data: Document = await req.json();

        const document = await update(
            { 
                documentId: data.id,
                userId: data.userId,
                title: data.title,
                content: data.content === null ? undefined : data.content,
                icon: data.icon === null ? undefined : data.icon,
                isPublished: data.isPublished,
                isArchived: data.isArchived
            }
        );

        const body = {message: `Заметка: ${document.id} была успешно обновлена!`};

        return new Response(JSON.stringify(body), {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

export async function DELETE(req: Request){

    try {
        const data: Document = await req.json();

        const document = await remove(data.id, data.userId);

        const body = {message: `Заметка: ${document.id} была успешно создана!`};

        return new Response(JSON.stringify(body), {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
