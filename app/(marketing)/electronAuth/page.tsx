"use client"

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";

export default function ElectronRedirest(){
    const [redirectUrl, setRedirectUrl] = useState("");

    useEffect(() => {
        async function prepareRedirect(){
            const session = await getSession();
            if(session && session.user){
                const userId = session.user.id;
                const email = session.user.email;
                const name = session.user.name;
                const image = session.user.image;
                const url = `myapp://auth?id=${encodeURIComponent(userId!)}&email=${encodeURIComponent(email!)}&name=${encodeURIComponent(name!)}&image=${encodeURIComponent(image!)}`;
                setRedirectUrl(url);
            }
        }
        prepareRedirect();
    }, []);

    useEffect(() => {
        if(redirectUrl){
            window.location.href = redirectUrl;
        }
    }, [redirectUrl]);

    return (
        <div>
            <p>Авторизация прошла успешно!
                <a href={redirectUrl || "#"}>Нажмите, чтобы перейти в приложение</a>
            </p>
        </div>
    )
}