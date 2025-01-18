"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api"

import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/components/toolbar";

interface IDocumentIdPageProps{
    params: {
        documentId: Id<"documents">;
    };
};

export default function DocumentIdPage({params} : IDocumentIdPageProps){
    
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    if(document === undefined){
        return(
            <div>
                Загрузка...
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
            <div className="h-[35vh]" />
            {/* <div className="md:max-w-3xl lg:max-w-full mx-auto"></div> */}
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData = { document } />
            </div>
        </div> 
    );
}