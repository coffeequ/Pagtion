"use client"

import { Suspense } from "react";
import NewPasswordForm from "../_components/new-password-form";
import Spinner from "@/components/Spinner";

export default function NewPasswordPage(){
    return (
            <div className="grid h-full place-items-center">
              <div className="flex w-full max-w-sm flex-col gap-6">
                <Suspense fallback= {<Spinner/>}>
                  <NewPasswordForm/>
                </Suspense>
              </div>
            </div>
    );
}