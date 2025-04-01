import Image from "next/image"
import pepeWhite from "@/public/PepemWhite.png"
import pepeBlack from "@/public/pepemBlack.png"

export function Hearos(){
    return (
        <div className="flex flex-col items-center justify-center max-w-1xl dark:bg-[#1f1f1f]">
            <div className="flex items-center">
                <div className="relative w-[200px] h-[200px] sm:w-[100px] sm:h-[100] md:w-[200px] md:h-[200px]">
                    <Image src = {pepeBlack}
                    fill 
                    className="object-contain dark:hidden"
                    alt = "Document"/>
                </div>
                <div className="relative w-[200px] h-[200px] sm:w-[100px] sm:h-[100] md:w-[200px] md:h-[200px] hidden md:block">
                    <Image src = {pepeWhite}
                    fill 
                    className="object-contain hidden dark:block"
                    alt = "Document"/>
                </div>
            </div>
        </div>
    );
}