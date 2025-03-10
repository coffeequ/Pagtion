"use client"

import NewVerificationForm from "@/components/new-verification-form";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default function VerificationPage(){
    return(
        <Suspense fallback={<Spinner/>}>
            <NewVerificationForm />
        </Suspense>
    );
}