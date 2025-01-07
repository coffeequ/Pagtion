"use client"

import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SearchCommand from "@/components/search-command";

const fontInter = Inter({
    subsets: ["cyrillic", 'latin'],
    weight: ["400"]
});

export default function MainLayot({ children } : { children:React.ReactNode }){
    
    const {isAuthenticated, isLoading} = useConvexAuth();

    if(isLoading){
        return (
          <div className="h-full flex items-center justify-center">
            <Spinner size="lg"/>
          </div>
        );
    }

    if(!isAuthenticated){
        return redirect("/");
    }

    return(
        <div className={cn("h-full flex dark:bg-[#1F1F1F]", fontInter)}>
            <Navigation/>
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                {children}
            </main>
        </div>
    );
}