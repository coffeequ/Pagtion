"use client"

import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";

import getId from "@/actions/idDocument";
import { useEffect, useState } from "react";
import { Document } from "@prisma/client";
import { useAuth } from "@clerk/clerk-react";


interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth } : NavbarProps) {
    
    const [document, setDocuments] = useState<Document>();

    const { userId } = useAuth();

    const params = useParams();

    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await getId(params.documentId as string, userId!);
            setDocuments(data); 
        }
        fetchDocuments();
    }, []);

    if(document === undefined){
        return (
            <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton/>
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton/>
                </div>
            </nav>
        );
    }

    if(document === null){
        return null;
    }
    
    return(
        <>
            <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
                {
                    isCollapsed && (
                        <MenuIcon role="button" onClick={onResetWidth} className="h-6 w-6 text-muted-foreground"/>
                    )
                }
                <div className="flex items-center justify-between w-full">
                    <Title initialData = {document}/>
                    <div className="flex items-center gap-x-2">
                        <Publish initialData = {document} />
                        <Menu documentId = {document.id} />
                    </div>
                </div>
            </nav>
            {
                document.isArchived && (
                    <Banner documentId = {document.id} />
                )
            }
        </>
    );
}