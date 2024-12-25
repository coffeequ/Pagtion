"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Heading(){
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Pagtion is the private and flexible writing app that adapts to the way you <span className="underline">think</span>.
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                better, faster, worker
            </h3>
            <Button>
                Let`s go
                <ArrowRight className="h-4 w-4"/>
            </Button>
        </div>
    );
}