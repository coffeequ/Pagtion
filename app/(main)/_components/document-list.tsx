"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, cache } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { Document } from "@prisma/client";

import sidebar from "@/actions/sidebarDocument";

interface DocumentListProps{
    parentDocumentId?: string;
    level?: number;
    data?: Document[];
    stateUpdate?: boolean,
}

export default function DocumentList({ parentDocumentId, level = 0, stateUpdate} : DocumentListProps) {

    const params = useParams();

    const router = useRouter();

    const [documents, setDocuments] = useState<Document[]>([]);

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    function onExpand(documentId: string){
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    }

    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await sidebar(parentDocumentId as string);
            setDocuments(data);
        }
        fetchDocuments();
    }, [stateUpdate]);

    function onRedirect(documentId: string){
        router.push(`/documents/${documentId}`);
    }

    if (documents === undefined){
        return(
            <>
                <Item.Skeleton level = {level}/>
                {level === 0} && (
                    <>
                        <Item.Skeleton level={level}/>
                        <Item.Skeleton level={level}/>
                    </>
                )
            </>
        )
    }
    
    return(
        <>
            <p
            style = {{
                paddingLeft: level ? `${(level * 12) + 25}px` : undefined
            }}
            //3:32:59
            className={cn("hidden text-sm font-medium text-muted-foreground/80", expanded && "last:block", level === 0 && "hidden")}>
                Нет вложенных страниц
            </p>
            {documents.map((document) => (
                <div key={document.id}>
                        <Item id={document.id}
                        onClick={() => onRedirect(document.id)}
                        label = {document.title}
                        icon = {FileIcon}
                        documentIcon={document.icon!}
                        active = {params.documentId === document.id}
                        level = {level}
                        onExpand={() => onExpand(document.id)}
                        expanded = {expanded[document.id]}
                        />
                        {
                            expanded[document.id] && (
                                <DocumentList
                                    parentDocumentId={document.id}
                                    level={level + 1}
                                />
                            )
                        }
                </div>
            ))}
        </>
    );
}