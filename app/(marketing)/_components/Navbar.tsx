"use client"

import userScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Navbar(){
    
    const scrolled = userScrollTop();

    const { status, data } = useSession();

    const userImage = data?.user?.image;

    return(
        <div className= {cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 grid lg:grid-cols-5 md:lg:grid-cols-5 grid-cols-4 gap-7 items-center w-full p-2 pt-3", scrolled && "shadow-sm bg-background/55 backdrop-blur-md")}>
            <div></div>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                <Link href="/app">
                    <Button variant="ghost">
                        Приложение
                    </Button>
                </Link>
            </div>
            {
                status === "loading" && (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                        <Spinner/>
                    </div>
                )
            }
            {
                status === "authenticated" && (
                    <div className="md:ml-auto md:justify-end md:items-center justify-between w-full flex items-center gap-x-1">
                        <Avatar className="flex justify-center items-center">
                        {
                            !userImage ? (
                                <User/>
                            ): (
                                <AvatarImage src={userImage} />
                            )
                        }
                        </Avatar>
                        <span>|</span>
                        <Link href="/documents">
                            <Button variant="ghost">Перейти</Button>
                        </Link>
                    </div>
                )
            }
            {
                status === "unauthenticated" && (
                     <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                        <Link href="/login">
                            <Button variant="ghost">
                                Авторизация
                            </Button>        
                        </Link>
                    </div>
                )
            }
        </div>
    );
}