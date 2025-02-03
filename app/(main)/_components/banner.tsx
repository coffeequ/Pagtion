"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IBannerProps{
    documentId: Id<"documents">;
}


export default function Banner({documentId}: IBannerProps){

    const router = useRouter();

    const remove = useMutation(api.documents.remove);

    const restore = useMutation(api.documents.restore);

    function onRemove(){
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Удаление заметки...",
            success: "Удаление произошло успешно!",
            error: "Произошла ошибка при удалении."
        });

        router.push("/documents");
    }

    function onRestore(){
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Восстановление заметки...",
            success: "Восстановление произошло успешно!",
            error: "Произошла ошибка при восстановлении."
        });
    }

    return(
        <>
            <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
                <p>
                    Эта страница находится в корзине.
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