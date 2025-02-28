import Image from "next/image";
import { Manrope } from "next/font/google";
import logoppl from "@/public/ppl-full-logo.svg"

import { cn } from "@/lib/utils";

const fontManrope = Manrope({
    subsets: ["cyrillic", 'latin'],
    weight: ["400", "600"]
});

export default function Logo() {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image src= {logoppl} alt="logo" height="40" width="40"/>
            <a href="/">
                <p className = {cn("font-semibold", fontManrope.className)}>Pagtion</p>
            </a>
        </div>
    );
}