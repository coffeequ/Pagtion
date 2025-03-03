"use client"
import { Suspense } from "react"
import LoginForm from "../_components/login-form"
import Spinner from "@/components/Spinner"

export default function LoginPage() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback = { <div><Spinner/></div> }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
