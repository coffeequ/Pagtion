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
        <div className= {cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm ")}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
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
                            <Button className={cn(fontInter)} variant="ghost" size="sm" asChild>
                                <Link href="/document">
                                    Войти в pagtion
                                </Link>
                            </Button>
                            <UserButton/>
                        </>
                    )
                }
                <ModeToggle/>
            </div>
        </div>
    );
}