"use client"

import { useCallback, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { Button } from "./ui/button";
import { FormSucces } from "@/app/(marketing)/_components/form-succes";
import { FormError } from "@/app/(marketing)/_components/form-error";
import { useRouter } from "next/navigation";

export default function NewVerificationForm(){

    const router = useRouter();

    const [error, setError] = useState<string | undefined>();

    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSumbit = useCallback(() => {
        if(success || error) return;

        if(!token){
            setError("Не действительный токен!");
            return;
        }

        newVerification(token).then((data) => {
            setError(data.error);
            setSuccess(data.success);
        }).catch(() => {
            setError("Что-то пошло не так!")
        });
    }, [token, success, error]);

    useEffect(() => {
        onSumbit();
    }, [onSumbit]);

    return(
        <div className="grid h-full place-items-center">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col">
                    <div className="flex flex-col items-center space-y-6">
                        <span>Подтверждение верификации</span>
                        { !success && !error && (
                            <Spinner/>
                        ) }
                        <FormSucces message={success} />
                        {
                            !success && (
                                <FormError message={error} />
                            )
                        }
                        <Button variant="link" onClick={() => router.push("/login")}>
                            Назад к авторизации
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}