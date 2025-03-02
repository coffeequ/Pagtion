"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import remove from "@/actions/removeDocument";
import restore from "@/actions/restoreDocument";
import useRefreshStore from "@/hooks/use-refresh";

interface IBannerProps{
    documentId: string
}

export default function Banner({documentId}: IBannerProps){

    const router = useRouter();

    const {userId} = useAuth();

    const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);

    function onRemove(){
        const promise = remove(documentId);

        toast.promise(promise, {
            loading: "Удаление заметки...",
            success: "Удаление произошло успешно!",
            error: "Произошла ошибка при удалении."
        });

        router.push("/documents");
    }

    function onRestore(){

        const promise = restore(documentId, userId as string);

        toast.promise(promise, {
            loading: "Восстановление заметки...",
            success: "Восстановление произошло успешно!",
            error: "Произошла ошибка при восстановлении."
        });

        triggerRefresh();
        
        router.push("/documents");
    }

    return(
        <>
            <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
                <p>
                    Страница находится в корзине.
                </p>
                <Button onClick={onRestore} variant="outline" className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                    Восстановить страницу
                </Button>
                <ConfirmModal onConfirm={onRemove}>
                    <Button variant="outline" className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                        Удалить страницу
                    </Button>
                </ConfirmModal>
            </div>
        </>
    );
}