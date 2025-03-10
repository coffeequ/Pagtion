"use client"
import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { redirect } from "next/navigation"
import { useSearchParams } from "next/navigation"

import { NewPasswordSchema } from "@/schemas"
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
import { newPassword } from "@/actions/new-password";



export default function NewPasswordForm(){
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        if(!token){
            return { error: "Не действительный токен!" }
        }

        startTransition(() => {
            newPassword(values, token).then((data) => {
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
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Пароль
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPading}
                                    placeholder="Очень секретный пароль"
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error}/>
                    <FormSucces message={success}/>
                    <Button type="submit" className="w-full" disabled={isPading}>
                        Применить пароль
                    </Button>
                </form>
            </Form>
            <div className="flex justify-center mt-2">
                <Button variant="link" onClick={() => redirect("/login")}>
                    Перейти к авторизации
                </Button>
            </div>
        </div>
    )
}