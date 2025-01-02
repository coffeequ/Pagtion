"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

export default function DocumentPage(){
    const { user } = useUser();
    return(
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-medium">Добро пожаловать {user?.firstName}!</h2>
            <Button>
                Создать первую заметку
            </Button>
        </div>
    );
}