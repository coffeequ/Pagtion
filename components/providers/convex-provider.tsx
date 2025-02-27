"use client"

import { ReactNode } from "react"

import { ClerkProvider} from "@clerk/clerk-react"


export const ConvexClientProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    return (
        <ClerkProvider
        afterSignOutUrl="/"
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            {children}
        </ClerkProvider>
    );
}