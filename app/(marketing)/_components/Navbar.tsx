"use client"

import userScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User } from "lucide-react";

export default function Navbar(){
    
    const scrolled = userScrollTop();

    return(
        <div className= {cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 grid grid-cols-5 gap-1 items-center w-full p-2 pt-3", scrolled && "shadow-sm bg-background/55 backdrop-blur-md")}>
            <div></div>
            <Logo/>
            <div></div>
            <Button variant="ghost" size="default" onClick={() => redirect("/login")}>
                Авторизироваться
                <User href="/login"/>
            </Button>
        </div>
    );
}