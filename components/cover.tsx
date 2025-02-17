"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

import removeCoverImageDocument from "@/actions/removeCoverImageDocument";

import { useAuth } from "@clerk/clerk-react";

interface ICoverProps {
    url?: string,
    preview?: boolean;
}

export default function Cover({ preview, url } : ICoverProps){
    
    const { edgestore } = useEdgeStore();

    const { userId } = useAuth();

    const params = useParams();

    const {setCoverImage, onReplace} = useCoverImage();

    console.log(url);

    async function onRemove () {
        if(url){
            await edgestore.publicFiles.delete({
                url
            });
        }

        await removeCoverImageDocument(params.documentId as string, userId!);
        setCoverImage("");
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
                        <Button onClick={() => onReplace(url as string)} className="text-muted-foreground text-xs" variant="outline">
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
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return(
        <Skeleton className="w-full h-[12vh]" />
    );
}