"use client"

import userScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { ClerkProvider, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Spinner from "@/components/Spinner";
import Link from "next/link";

const fontInter = Inter({
    subsets: ["cyrillic", 'latin'],
    weight: ["400"]
});

export default function Navbar(){
    
    const scrolled = userScrollTop();

    const {isAuthenticated, isLoading} = useConvexAuth()

    return(
        <div className= {cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 grid grid-cols-5 gap-1 items-center w-full p-2 pt-3", scrolled && "shadow-sm bg-background/55 backdrop-blur-md")}>
            <div></div>
            <Logo/>
            <div></div>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                {isLoading && (
                    <Spinner/>
                )}
                {
                    !isAuthenticated && !isLoading && (
                        <>
                            <SignInButton>
                                <Button className={cn(fontInter)} variant="ghost" size="sm">
                                    Авторизация
                                </Button>
                            </SignInButton>
                        </>
                    )
                }

                {
                    isAuthenticated && !isLoading && (
                        <>
                            <Button className={cn(fontInter)} variant="ghost" asChild>
                                <Link href="/document">
                                    Перейти в pagtion
                                </Link>
                            </Button>
                            <a className="pr-1">
                                |
                            </a>
                            <UserButton/>
                        </>
                    )
                }
                {/* <ModeToggle/> */}
                
            </div>
        </div>
    );
}