"use client"

import userScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

export default function Navbar(){
    
    const scrolled = userScrollTop();

    return(
        <div className= {cn("z-50 bg-background fixed top-0 flex items-center w-full p-6",
        )}>
            Hi im navbar
        </div>
    );
}