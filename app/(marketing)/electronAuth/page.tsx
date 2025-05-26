"use client"

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import GetAllDocuments from "@/actions/GetAllDocuments";

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
                const documents = await GetAllDocuments(userId!);
                const url = `pagtion://auth?id=${encodeURIComponent(userId!)}&email=${encodeURIComponent(email!)}&name=${encodeURIComponent(name!)}&image=${encodeURIComponent(image!)}&documents=${encodeURIComponent(JSON.stringify(documents)!)}`;
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
        <div className="flex flex-col items-center justify-center">
            <p className="text-center">Авторизация прошла успешно!
                <br/>
                <a href={redirectUrl || "#"} className="m-5 hover:underline">Нажмите, чтобы перейти в приложение</a>
            </p>
        </div>
    )
}