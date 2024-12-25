import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const fontInter = Inter({
    subsets: ["cyrillic", 'latin'],
    weight: ["400"]
});

import Logo from "./logo";
import { cn } from "@/lib/utils";

export default function Footer() {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo/>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button className={cn("font-semibold", fontInter)} variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button className={cn("font-semibold", fontInter)} variant="ghost" size="sm">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
}