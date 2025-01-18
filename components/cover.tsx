"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

interface ICoverProps {
    url?: string,
    preview?: boolean;
}

export default function Cover({ url, preview } : ICoverProps){
    
    const params = useParams();

    const coverImage = useCoverImage();

    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    function onRemove () {
        removeCoverImage({
            id: params.documentId as Id<"documents">
        });
    }
    
    return(
        <div className={cn("relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {
                !!url && (
                    <Image src={url} fill alt="Обложка" className="object-cover" />
                )
            }
            {
                url && !preview && (
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                        <Button onClick={coverImage.onOpen} className="text-muted-foreground text-xs" variant="outline">
                            <ImageIcon className="h-4 w-4 mr-4"/>
                            Поменять фон
                        </Button>
                        <Button onClick={onRemove} className="text-muted-foreground text-xs" variant="outline">
                            <X className="h-4 w-4 mr-4"/>
                            Удалить фон
                        </Button>
                    </div>
                )
            }
            Обложка
        </div>
    )
}