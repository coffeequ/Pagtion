"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/actions/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);
    
    if(!validateFields.success){
        return { error: "Не допустимый email" };
    }

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error: "Почта не была найдена!" };
    }

    const passwordIdResetToken = await generatePasswordResetToken(email);

    sendPasswordResetEmail(passwordIdResetToken.email, passwordIdResetToken.token);

    return { success: "Запрос был направлен на вашу почту!" }
}