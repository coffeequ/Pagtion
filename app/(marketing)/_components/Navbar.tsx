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
import { useEffect } from "react";

export default function Navbar(){
    
    const scrolled = userScrollTop();

    const { status, data } = useSession();

    const userImage = data?.user?.image;

    useEffect(() => {
        
    }, [])

    return(
        <div className= {cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 grid grid-cols-5 gap-1 items-center w-full p-2 pt-3", scrolled && "shadow-sm bg-background/55 backdrop-blur-md")}>
            <div></div>
            <Logo/>
            <div></div>
            {
                status === "loading" && (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                        <Spinner/>
                    </div>
                )
            }
            {
                status === "authenticated" && (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                        <Avatar>
                        {
                            !userImage ? (
                                <User/>
                            ): (
                                <AvatarImage src={userImage} />
                            )
                        }
                        </Avatar>
                        <span>|</span>
                        <Button variant="ghost">
                            <Link href="/documents">
                                Перейти
                            </Link>
                        </Button>
                    </div>
                )
            }
            {
                status === "unauthenticated" && (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                        <Button variant="ghost">
                            <Link href="/login">
                                Авторизация
                            </Link>
                        </Button>
                    </div>
                )
            }
        </div>
    );
}