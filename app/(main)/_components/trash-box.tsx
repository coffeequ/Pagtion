"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";

import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TrashBox(){

    const router = useRouter();

    const params = useParams();

    const documents = useQuery(api.documents.getTrash);

    const restore = useMutation(api.documents.restore);

    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filtredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    function onClick(documentId: string){
        router.push(`/documents/${documentId}`);
    }

    function onRestore(event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">){
        event.stopPropagation();

        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Восстановление заметки...",
            success: "Заметка была успешно восстановлена!",
            error: "Ошибка восставновление заметки"
        });
    }


    function onRemove(documentId: Id<"documents">){
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Удаление заметки...",
            success: "Удаление произошло успешно!",
            error: "Ошибка удаления заметки"
        });

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
        <div className="text-sm border ml-1">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} className="h-7 px-2 focus-visible:ring-transparent bg-secondary" placeholder="Поиск по наимнованию страницы" />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    Страницы не были найдены
                </p>
                {filtredDocuments?.map((document) => (
                    <div key={document._id} role = "button" onClick={() => onClick(document._id)} className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between">
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div onClick={(e) => onRestore(e, document._id)} role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                <Undo className="w-4 h-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
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