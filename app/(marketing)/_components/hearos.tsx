import Image from "next/image"
import files from "@/public/ppl.png"

export function Hearos(){
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350] md:w-[400px] md:h-[400px]">
                    <Image src = {files}
                    fill 
                    className="object-contain"
                    alt = "Document"/>
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image src = {files}
                    fill 
                    className="object-contain"
                    alt = "Document"/>
                </div>
            </div>
        </div>
    );
}