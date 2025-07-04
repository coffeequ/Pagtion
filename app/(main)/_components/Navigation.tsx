"use client"

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ComponentRef, useEffect, useRef, useState } from "react";
import {useMediaQuery} from "usehooks-ts"
import UserItem from "./user-item";
import Item from "./Item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { PopoverContent } from "@radix-ui/react-popover";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "./navbar";

import { createDocument } from "@/actions/createDocument";
import useRefreshStore from "@/hooks/use-refresh";
import { useSession } from "next-auth/react";

export default function Navigation(){

    const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);

    const router = useRouter();
    const settings = useSettings();
    const search = useSearch();
    const params = useParams();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { data } = useSession();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ComponentRef<"aside">>(null);
    const navbarRef = useRef<ComponentRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() =>{
        if(isMobile){
            collapse();
        }
        else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if(isMobile){
            collapse();
        }
    }, [pathname, isMobile]);

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>){
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event: MouseEvent) {
       if(!isResizingRef.current) return;
       
       let newWidth = event.clientX;

       if(newWidth < 240){
        newWidth = 240;
       }
       if(newWidth > 480){
        newWidth = 480;
       }

       if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    }

    function handleMouseUp(){
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    function resetWidth() {
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";

            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

            navbarRef.current.style.setProperty("left", isMobile ? "100%": "240px");

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    function collapse() {
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    function handleCreateNote() {
        if(!data?.user?.id){
            throw new Error("Не найден id пользователя");
        }
        const promise = createDocument("Untitled", data?.user?.id).then((documentId) => {
            router.push(`/documents/${documentId.id}`);
            triggerRefresh();
        });

        toast.promise(promise, {
            loading: "Создание новой заметки...",
            success: "Заметка успешно создана!",
            error: "Произошла ошибка при создании заметки"
        });
    }

    return(
        <>
            <aside ref={sidebarRef} className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
                    isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0"
                )}>
                        
                <div role = "button" onClick={collapse} className ={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", 
                        isMobile && "opacity-100"
                    )}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem/>
                    <Item
                        label="Поиск"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item 
                        label="Настройки"
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                    <Item onClick = {handleCreateNote} label = "Новая страница" icon = {PlusCircle} />
                    <Popover>
                        <PopoverTrigger className="w-full">
                            <Item label="Корзина" icon={Trash}/>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72" side = {isMobile ? "bottom" : "right"}>
                            <TrashBox/>
                        </PopoverContent>  
                   </Popover>
                </div>
                <hr className="mt-2"/>
                <div className="flex-1 overflow-y-auto mt-4">
                    <DocumentList collapse={collapse} isMobile={isMobile} />
                    <div className="mt-4 mb-4">
                        <Item onClick={handleCreateNote} label="Добавить страницу" icon={Plus}/>
                    </div>
                </div>
                <div onMouseDown={handleMouseDown} 
                    onClick={resetWidth} 
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )} 
                >
                {
                    !!params.documentId ? (
                        <Navbar isCollapsed = {isCollapsed} onResetWidth = {resetWidth}/>
                    )
                    :(
                        <nav className="bg-transparent px-3 py-2 w-full">
                            {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground" />}
                        </nav>
                    )
                }
            </div>
        </>
    );
}