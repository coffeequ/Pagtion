"use client"
import { LiveblocksProvider } from "@liveblocks/react";
import { ReactNode } from "react";

export function ProviderLb({ children }: { children: ReactNode }){
    return(
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            { children }
        </LiveblocksProvider>
    )
}