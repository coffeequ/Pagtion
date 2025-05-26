import { getUserByEmail } from "@/actions/user";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export async function POST (req: Request){

    const body: z.infer<typeof LoginSchema> = await req.json();

    const validatedFields = LoginSchema.safeParse(body);

    if(!validatedFields.success){
        return new Response(JSON.stringify({ error: "Не правильно заполнены поля!" }), {
            status: 404
        });
    }

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);
    
    if(!user || !user.password) return new Response(JSON.stringify({ error: "Ошибка авторизации" }), {
        status: 403,
    });
    
    const passwordMatch = await bcrypt.compare(password, user.password);          
    
    if(passwordMatch){
        return new Response(JSON.stringify(user), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            },
        });
    }
    else{
        return new Response(JSON.stringify({error: "Не правильно введён пароль!"}), {
            status: 403,
            headers:{
                "Content-Type": "application/json"
            }
        })
    }

};


