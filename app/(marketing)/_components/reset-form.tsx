"use client"
import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { ResetSchema } from "@/schemas"
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
import { reset } from "@/actions/reset"
import { useRouter } from "next/navigation"



export default function ResetForm(){
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPading, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        //console.log(values);

        startTransition(() => {
            reset(values).then((data) => {
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
                    </div>
                    <FormError message={error}/>
                    <FormSucces message={success}/>
                    <Button type="submit" className="w-full" disabled={isPading}>
                        Отправить
                    </Button>
                </form>
            </Form>
            <div className="flex justify-center mt-2">
                <Button variant="link" onClick={() => {router.push("/login")}}>
                    Перейти к авторизации
                </Button>
            </div>
        </div>
    )
}