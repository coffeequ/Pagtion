"use client"

import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

import { createDocument } from "@/actions/createDocument";
import { useSession } from "next-auth/react";

export default function DocumentPage(){
    
    const router = useRouter();

    const { data } = useSession();

    const userId = data?.user?.id;

    const userData = data?.user?.name;
    
    const create = createDocument;

    if(!userId){
        redirect("/documents");
    }

    function onCreate(){
        if(!userId){
            throw new Error("Не найден id пользователя!");
        }
        const promise = create("Untitled", userId).then((documentId) => router.push(`/documents/${documentId.id}`));
        
        toast.promise(promise, {
            loading: "Создание новой заметки...",
            success: "Новая заметка создана!",
            error: "Ошибка создание новой заметки"
        });
    }

    return(
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-medium">Добро пожаловать {userData}!</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>Создать первую заметку
            </Button>
        </div>
    );
}