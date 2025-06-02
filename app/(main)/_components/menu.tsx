"use client";

import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { archived } from "@/actions/ArchiveDocument";
import { useSession } from "next-auth/react";
import useRefreshStore from "@/hooks/use-refresh";

interface IMenuProps {
    documentId: string;
}

export default function Menu({documentId} : IMenuProps) {

    const router = useRouter();

    const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);

    const { data } = useSession();

    const userId = data?.user?.id;

    const userName = data?.user?.name;

    function onArchive() {
        const promise = archived(documentId, userId).then(() => {
            triggerRefresh();
        });

        toast.promise(promise, {
            loading: "Перемещение в мусорку...",
            success: "Страница была перемещена в корзину!",
            error: "Перемещение не удалось."
        })
        router.push("/documents");
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Удалить
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <div className="text-xs text-muted-foreground p-2">
                    <span>Последний кто редактировал: {userName}</span>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10" />
    );
}