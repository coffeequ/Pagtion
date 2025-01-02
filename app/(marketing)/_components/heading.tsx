"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const fontInter = Inter({
    subsets: ["cyrillic", 'latin'],
    weight: ["400"]
});

export default function Heading(){

    const {isAuthenticated, isLoading} = useConvexAuth();

    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Pagtion is the private and flexible writing app that adapts to the way you <span className="underline">think</span>.
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                better, faster, worker
            </h3>
            {
                isLoading && (
                    <div className="w-full flex items-center justify-center">
                        <Spinner size="lg"/>    
                    </div>
                )
            }
            {
                isAuthenticated && !isLoading && (
                    <Button className={cn(fontInter)} asChild>
                        <Link href="/document">
                            Войти в Pagtion
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </Button>
                )
            }
            {
                !isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button className={cn(fontInter)}>
                            Let`s go
                            <ArrowRight className="h-4 w-4"/>
                        </Button>
                    </SignInButton>
                )
            }
        </div>
    );
}