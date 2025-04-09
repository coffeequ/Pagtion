"use client"

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { getUserByEmail } from "@/actions/user";
import { generateVerificationToken } from "@/lib/token";
import { sendPasswordConfirmEmail } from "@/lib/mail";
import { useEffect, useState } from "react";

export default function ConfirmMail(){

    const { data } = useSession();

    const [statusMailVerified, setStatusMailVerified] = useState<boolean>();

    useEffect(() => {
        console.log("Метод сработал");

        const checkEmailVerified = async () => {
            const existingUser = await getUserByEmail(data?.user?.email as string);
            
            if(existingUser!.emailVerified){
                setStatusMailVerified(true);
            }
            else{
                setStatusMailVerified(false);
            }
        }
        checkEmailVerified();
    }, [])

    const onClick = async () => {
        console.log("Отправка...");
        const existingUser = await getUserByEmail(data?.user?.email as string);
            
        if(!existingUser!.emailVerified){
            const verificationToken = await generateVerificationToken(existingUser!.email!);
            sendPasswordConfirmEmail(verificationToken.email, verificationToken.token);
            console.log("Отправленно");
            return;
        }

        setStatusMailVerified(true);
    }

    return (
        <div>
            <Button onClick={onClick} disabled={statusMailVerified}>
                Отправить письмо на почту
            </Button>
        </div>
    );
}