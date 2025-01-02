import Image from "next/image"
import pepeWhite from "@/public/PepemWhite.png"
import pepeBlack from "@/public/pepemBlack.png"

export function Hearos(){
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl dark:bg-[#1f1f1f]">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350] md:w-[400px] md:h-[400px]">
                    <Image src = {pepeBlack}
                    fill 
                    className="object-contain dark:hidden"
                    alt = "Document"/>
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image src = {pepeWhite}
                    fill 
                    className="object-contain hidden dark:block"
                    alt = "Document"/>
                </div>
            </div>
        </div>
    );
}