"use client"

import * as z from "zod"

import { signIn } from "next-auth/react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { redirect, useSearchParams } from "next/navigation"

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
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import Link from "next/link"
import { getUserByEmail } from "@/actions/user"


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

    const onClick = (provider: "google" | "yandex") => {
        const handleSignin = async () => {
            await signIn(provider, {
                redirectTo: DEFAULT_LOGIN_REDIRECT
            });
        }
        handleSignin();
    }

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        const validatedFields = LoginSchema.safeParse(values);
    
        if(!validatedFields.success){
            setError("Не правильно заполнены поля!");
            return;
        }

        const { email, password } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        //console.log(existingUser);

        if(!existingUser || !existingUser.email || !existingUser.password){
            setError("Аккаунт с такой почтой не зарегистрирован!")
            return;
        }

        startTransition(async () => {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })
            if(res?.error){
                switch (res?.error) {
                    case "CredentialsSignin":
                        setError("Не правильный пароль!");
                        return;
                    default:
                        setError("Что-то пошло нет так!");
                        return;
                    }
                }
            else{
                setSuccess("Авторизация прошла успешно!");
                redirect("/documents");
            }
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
                                <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                    <Link href="/reset">
                                        Забыл пароль
                                    </Link>
                                </Button>
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
            <div className="flex justify-center mt-2">
                <Button variant="link" onClick={() => redirect("/register")}>
                    Нет аккаунта? Попробуйте создать его!
                </Button>
            </div>
            <hr className="w-48 h-1 mx-auto my-2 bg-gray-200 border-0 rounded-sm md:my-4 dark:bg-gray-500"/>
            <Button variant="ghost" className="mt-2" onClick={() => onClick("google")}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-current h-5 w-5 opacity-90">
                    <path d="M12.48 10.92v3.28h7.84a6.95 6.95 0 0 1-1.79 4.13 8.03 8.03 0 0 1-6.05 2.4c-4.83 0-8.6-3.89-8.6-8.72a8.6 8.6 0 0 1 14.5-6.37l2.31-2.3A11.33 11.33 0 0 0 12.48 0C5.87 0 .31 5.39.31 12s5.56 12 12.17 12c3.57 0 6.27-1.17 8.37-3.36 2.16-2.16 2.84-5.21 2.84-7.67 0-.76-.05-1.46-.17-2.05H12.48z"></path>
                </svg>
                Войти с помощью Google
            </Button>
            <Button variant="ghost" className="mt-2" onClick={() => onClick("yandex")}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D"/>
            <path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff"/>
            </svg>
                Войти с помощью Yandex ID
            </Button>
        </div>
    )
}