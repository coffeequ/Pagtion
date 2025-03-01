"use client"

import Spinner from "@/components/Spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/search-command";
import { useUser } from "@clerk/clerk-react";

export default function MainLayot({ children } : { children:React.ReactNode }){

    const {isSignedIn, isLoaded} = useUser();
    
    if(!isLoaded){
        return (
          <div className="h-full flex items-center justify-center">
            <Spinner size="lg"/>
          </div>
        );
    }

    if(!isSignedIn){
        return redirect("/");
    }

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