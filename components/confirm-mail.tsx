"use client"

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { getUserByEmail } from "@/actions/user";
import { generateVerificationToken } from "@/lib/token";
import { sendPasswordConfirmEmail } from "@/lib/mail";
import { useEffect, useState } from "react";

export default function ConfirmMail(){

    const { data } = useSession();

    const [statusMailVerified, setStatusMailVerified] = useState<boolean>(true);

    const [isPost, setIsPost] = useState(false);

    useEffect(() => {        
        const checkEmailVerified = async () => {
            const existingUser = await getUserByEmail(data?.user?.email as string);
            if(!existingUser!.emailVerified){
                setStatusMailVerified(false);
                return;
            }
        }
        checkEmailVerified();
    }, [])

    const onClick = async () => {

        setIsPost(true);

        setTimeout(() => {
            setIsPost(false);
        }, 1000)

        const existingUser = await getUserByEmail(data?.user?.email as string);

        if(!existingUser!.emailVerified){
            const verificationToken = await generateVerificationToken(existingUser!.email!);
            sendPasswordConfirmEmail(verificationToken.email, verificationToken.token);
            return;
        }

        setStatusMailVerified(true);
    }

    return (
        isPost ? (
            <Button disabled={true}>
                Письмо для подтверждение было отправлено!
            </Button>
        ):(
            <Button disabled={statusMailVerified} onClick={onClick}>
                {
                    statusMailVerified ? (
                        "Почта подтверждена"
                    ):(
                        "Отправить пиьсмо для подтверждения"
                    )
                }
            </Button>
        )
    );
}