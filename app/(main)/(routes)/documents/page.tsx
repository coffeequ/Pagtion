"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DocumentPage(){
    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    function onCreate(){
        const promise = create({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`));

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