"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";

import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import trash from "@/actions/trashDocument";
import restore from "@/actions/restoreDocument";
import remove from "@/actions/removeDocument";
import { Document } from "@prisma/client";
import useRefreshStore from "@/hooks/use-refresh";
import { useSession } from "next-auth/react";

export default function TrashBox(){

    const router = useRouter();

    const { data } = useSession();

    const userId = data?.user?.id;

    const params = useParams();

    const [search, setSearch] = useState("");

    const [documents, setDocuments] = useState<Document[]>([]);

    const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);

    const [updateTrash, setUpdateTrash] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await trash(userId);
            setDocuments(data);
        }
        fetchData();
    }, [updateTrash]);

    const filtredDocuments = documents.filter((document: Document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    function onClick(documentId: string){
        router.push(`/documents/${documentId}`);
    }

    function onRestore(event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: string){
        debugger
        event.stopPropagation();

        const promise = restore(documentId, userId as string);

        toast.promise(promise, {
            loading: "Восстановление заметки...",
            success: "Заметка была успешно восстановлена!",
            error: "Ошибка восставновление заметки"
        });
        triggerRefresh();
        setUpdateTrash((prev) => !prev);
    }


    function onRemove(documentId: string){
        const promise = remove(documentId);

        toast.promise(promise, {
            loading: "Удаление заметки...",
            success: "Удаление произошло успешно!",
            error: "Ошибка удаления заметки"
        });
        setUpdateTrash((prev) => !prev);
        if(params.documentId === documentId){
            router.push("/documents")
        }
    }

    if(documents === undefined){
        return(
            <div className="h-full border flex items-center justify-center p-4">
                <Spinner size="lg"/>
            </div>
        );
    }

    return(
        <div className="text-sm border ml-1 bg-secondary">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} className="h-7 px-2 focus-visible:ring-transparent bg-secondary" placeholder="Поиск по наимнованию страницы" />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    Страницы не были найдены
                </p>
                {filtredDocuments?.map((document: Document) => (
                    <div key={document.id} role = "button" onClick={() => onClick(document.id)} className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between">
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div onClick={(e) => onRestore(e, document.id)} role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                <Undo className="w-4 h-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document.id)}>
                                <div role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                    <Trash className="h-4 w-4 text-muted-foreground"/>
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}