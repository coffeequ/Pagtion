import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    apiEdgePrefix
} from "@/routes"
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLogginIn = !!req.auth;

    const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isApiEdgeRoute = nextUrl.pathname.startsWith(apiEdgePrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // console.log("Текущая ссылка: ", nextUrl);
    // console.log("Авторизирован ли пользователь:", isLogginIn);
    // console.log("isApiRoute: ", isApiAuthPrefix);
    // console.log("isApiEdgeRoute", isApiEdgeRoute);
    // console.log("isAuthRoute:", isApiAuthPrefix);

    if(isApiAuthPrefix || isApiEdgeRoute){
        return;
    }

    // if(nextUrl.pathname.startsWith("/api/auth/callback?electron=true")){
    //     console.log("Условие сработало!!!!!!");
    //     if(nextUrl.searchParams.get("electron") === "true"){
    //         const code = nextUrl.searchParams.get("code");
    //         if(code){
    //             const urlRedirect = `myapp://auth?code=${encodeURIComponent(code)}`;
    //             return NextResponse.redirect(urlRedirect);
    //         }
    //     }
    // }

    if(isAuthRoute){
        if(isLogginIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return
    }

    return;
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
      ],
}
