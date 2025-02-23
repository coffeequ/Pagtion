"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

import Toolbar from "@/components/toolbar";
import Cover from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import update from "@/actions/updateDocument";
import getId from "@/actions/idDocument";
import { useAuth } from "@clerk/clerk-react";
import { Document } from "@prisma/client";
import { useCoverImage } from "@/hooks/use-cover-image";

interface IDocumentIdPageProps{
    params: {
        documentId: string
    };
};

export default function DocumentIdPage({params} : IDocumentIdPageProps){

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);

    const { url, setCoverImage } = useCoverImage();

    const { userId } = useAuth(); 

    const [document, setDocument] = useState<Document>();

    useEffect(() => {
        async function fetchDocument(){
            const document = await getId(params.documentId, userId!);
            setDocument(document);

            if(document.coverImage){
                setCoverImage(document.coverImage);
            }
            else{
                setCoverImage("");
            }
        }
        fetchDocument();
    }, [params.documentId]);

    // async function onTitleUpdate(title: string){
    //     await update({
    //         documentId: params.documentId,
    //         title,
    //     }).then((item) => setDocument(item));
    // }

    const onChangeTitle = useCallback((title: string) => {
        console.log(title);
        update({
            documentId: params.documentId,
            title
        });
    }, [params.documentId]);

    const onChangeContent = useCallback((content: string) => {
        update({
            documentId: params.documentId,
            content
        });
    }, [params.documentId])

    if(document === undefined){
        return(
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if(document === null){
        return(
            <div>
                Страница была не найдена.
            </div>
        );
    }
    
    return(
        <div className="pb-40">
            <Cover key={url} url={url} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData = { document } onTitleChange={onChangeTitle} />
                <Editor onChange = {onChangeContent} initialContent = { document.content } />
            </div>
        </div> 
    );
}