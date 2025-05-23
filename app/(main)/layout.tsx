"use client"

import Spinner from "@/components/Spinner";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/search-command";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MainLayot({ children } : { children : React.ReactNode }){
    
    const { status } = useSession();
    
    if(status === "loading"){
        return (
          <div className="h-full flex items-center justify-center">
            <Spinner size="lg"/>
          </div>
        );
    }

    if(status === "unauthenticated") redirect("/");

    return(
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation/>
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                {children}
            </main>
        </div>
    );
}