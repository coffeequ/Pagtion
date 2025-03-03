"use client"
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {

    const router = useRouter();

    return(
        <div className="grid h-full place-items-center">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex justify-center">
                    <TriangleAlert className="me-2" />
                    <p className="text-center">
                        Упс кажется, что-то случилось!
                    </p>
                </div>
                <Button  onClick={() => {
                    router.push("/login");
                }}> Вернуться к авторизации </Button>
            </div>
        </div>
    );
}