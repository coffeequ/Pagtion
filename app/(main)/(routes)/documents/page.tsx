"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

import { createDocument } from "@/actions/createDocument";

export default function DocumentPage(){
    const router = useRouter();
    const { user } = useUser();
    const create = createDocument;

    if(!user?.id){
        redirect("/documents");
    }

    function onCreate(){
        const promise = create("Untitled", user!.id).then((documentId) => router.push(`/documents/${documentId.id}`));
        
        toast.promise(promise, {
            loading: "Создание новой заметки...",
            success: "Новая заметка создана!",
            error: "Ошибка создание новой заметки"
        });
    }

    return(
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-medium">Добро пожаловать {user?.firstName}!</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>Создать первую заметку
            </Button>
        </div>
    );
}