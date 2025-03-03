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

interface IMenuProps {
    documentId: string;
}

export default function Menu({documentId} : IMenuProps) {

    const router = useRouter();

    const { data } = useSession();

    const userName = data?.user?.name;

    const archive = archived;

    function onArchive() {
        const promise = archive(documentId);

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
                <DropdownMenuSeparator>
                    <div className="text-xs text-muted-foreground p-2">
                        Последний кто редактировал: {userName}
                    </div>
                </DropdownMenuSeparator>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10" />
    );
}