// "use client"

// import { useSession } from "next-auth/react";
// import { Button } from "./ui/button";
// import { getUserByEmail } from "@/actions/user";
// import { generateVerificationToken } from "@/lib/token";
// import { sendPasswordConfirmEmail } from "@/lib/mail";
// import { useEffect, useState } from "react";

// export default function ConfirmMail(){

//     const { data } = useSession();

//     const [statusMailVerified, setStatusMailVerified] = useState<boolean>();

//     useEffect(() => {
//         const checkEmailVerified = async () => {
//             console.log("data: ", data);
//             const existingUser = await getUserByEmail(data?.user?.email as string);

//             console.log('existingUser: ', existingUser);
            
//             if(!existingUser || !existingUser.email || !existingUser.password){
            
//                 setStatusMailVerified(true);
            
//                 console.log("почта подтверждена?: ", existingUser?.emailVerified);
            
//                 return;
//             }
//             else{
//                 setStatusMailVerified(false);
//             }
//         }
//         checkEmailVerified();
//     }, [])

//     const onClick = async () => {
//         const existingUser = await getUserByEmail(data?.user?.email as string);
//         if(!existingUser || !existingUser.email || !existingUser.password){
//             return;
//         }
            
//         if(!existingUser.emailVerified){
//             const verificationToken = await generateVerificationToken(existingUser.email);
//             sendPasswordConfirmEmail(verificationToken.email, verificationToken.token);
//             return;
//         }
//     }

    

//     return (
//         <div>
//             <Button onClick={onClick} disabled={statusMailVerified}>
//                 Подтвердить почту
//             </Button>
//         </div>
//     );
// }