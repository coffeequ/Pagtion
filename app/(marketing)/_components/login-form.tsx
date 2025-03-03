"use client"
import * as z from "zod"

import { signIn } from "next-auth/react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"

import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormError } from "./form-error"
import { FormSucces } from "./form-succes"
import login from "@/actions/login"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { Mail } from "lucide-react"

export default function LoginForm(){
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Почты различаются!" : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onClick = (provider: "google" | "mail") => {
        signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    }

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        })
    }

    return (
        <div className="flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Почта
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPading}
                                    placeholder="example@mail.ru"
                                    type="email"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Пароль
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPading}
                                    placeholder="123"
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSucces message={success}/>
                    <Button type="submit" className="w-full" disabled={isPading}>
                        Авторизироваться
                    </Button>
                </form>
            </Form>
            <hr className="w-48 h-1 mx-auto my-2 bg-gray-200 border-0 rounded-sm md:my-4 dark:bg-gray-500"/>
            <Button variant="ghost" className="mt-2" onClick={() => onClick("google")}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-current h-5 w-5 opacity-90">
                    <path d="M12.48 10.92v3.28h7.84a6.95 6.95 0 0 1-1.79 4.13 8.03 8.03 0 0 1-6.05 2.4c-4.83 0-8.6-3.89-8.6-8.72a8.6 8.6 0 0 1 14.5-6.37l2.31-2.3A11.33 11.33 0 0 0 12.48 0C5.87 0 .31 5.39.31 12s5.56 12 12.17 12c3.57 0 6.27-1.17 8.37-3.36 2.16-2.16 2.84-5.21 2.84-7.67 0-.76-.05-1.46-.17-2.05H12.48z"></path>
                </svg>
                Войти с помощью Google
            </Button>
            <Button variant="ghost" className="mt-2" onClick={() => onClick("mail")}>
                <Mail/>
                Войти с помощью mail
            </Button>
        </div>
    )
}