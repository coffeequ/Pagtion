"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error(){
    return(
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <p>👀</p>
            <h2 className="text-lg font-medium">
                Кажется, что-то произошло...
            </h2>
            <Button asChild>
                <Link href="/documents">
                    Вернуться назад
                </Link>
            </Button>
        </div>
    );
}