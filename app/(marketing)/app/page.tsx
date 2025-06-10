import Image from "next/image"
import screenshoteapp from "@/public/Screenshot-настольного-приложения.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function App(){
    return(
        <div className="flex justify-center items-center m-5">
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col justify-center items-center ">
                    <div className="flex flex-col">
                        <span className="font-bold text-balance antialiased text-4xl mb-4">
                            Загрузите приложение Pagtion на ПК, чтобы получить лучший опыт взаимодействия с заметками.
                        </span>
                        <Link href="https://github.com/coffeequ/PagtionDesktop/releases/download/v0.0.8/pagtion.0.0.8.msi">
                            <Button>Установить</Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Image src = {screenshoteapp}
                    width={2000}
                    height={1642}
                    alt="Скриншот настольной версии приложения">
                    </Image>
                </div>
            </div>
        </div>
    );
}