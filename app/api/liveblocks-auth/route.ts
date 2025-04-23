import { prisma } from "@/lib/prisma";
import { Liveblocks } from "@liveblocks/node";
import { getToken } from "next-auth/jwt"

const liveblocks = new Liveblocks({
  secret: "sk_dev_vfy2JEEY_ZrdQsxWANysu2UlPdIgH4rEFNPkHplGFr4mfTUKtAt2QV5oA3X93EHq",
});

export async function POST(request: Request) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(!token){
        return new Response("Пользователь не авторизован", { status: 403 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: token.sub
        }
    });

    if(!user){
        return new Response("Пользователь не был найден", { status: 403 });
    }

    const { status, body } = await liveblocks.identifyUser(user.id, { userInfo: {name: user.name, avatar: user.image} })
    console.log({ status, body });
    return new Response(body, { status });
}

