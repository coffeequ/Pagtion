"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { auth } from '@clerk/nextjs/server'
import { ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const fontInter = Inter({
    subsets: ["cyrillic", 'latin'],
    weight: ["400"]
});

export default function Heading(){

    const { isLoaded, isSignedIn } = useAuth()
    
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Pagtion приложение для письма, которое подстраивается под ваш образ <span className="underline">мышления</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                лучше, быстрее, продуктивнее
            </h3>
            {
                !isLoaded && (
                    <div className="w-full flex items-center justify-center">
                        <Spinner size="lg"/>    
                    </div>
                )
            }
            {
                isSignedIn && isLoaded && (
                    <Button className={cn(fontInter)} asChild>
                        <Link href="/documents">
                            Войти в Pagtion
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </Button>
                )
            }
            {
                !isSignedIn && !isLoaded && (
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