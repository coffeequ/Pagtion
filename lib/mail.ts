import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "pagtionpagtions@gmail.com",
        pass: process.env.APP_PASSWORD_SMTP
    }
});

function emailConfirm(email: string, token: string){

    const confirmLink = `https://pagtion.vercel.app/new-verification?token=${token}`;

    return {
        from: "pagtion@yandex.ru",
        to: email,
        subject: "Подтверждение почты",
        html: `
            <p>
                <a href="${confirmLink}"> нажмите</a> для подтверждения почты.
            </p>
        `
    }
}

function resetPassword(email: string, token: string){
    const resetLink = `https://pagtion.vercel.app/new-password?token=${token}`;

    return {
        from: "pagtion@yandex.ru",
        to: email,
        subject: "Восстановление пароля",
        html: `
            <p>
                <a href="${resetLink}"> нажмите </a> для восстановления пароля.
            </p>
        `
    }
}

async function passwordConfirmEmail(email: string, token: string) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(emailConfirm(email, token), (error, info) => {
            if(error){
                reject(error);
            }
            resolve(info);
        })
    });
}

async function passwordResetEmail(email: string, token: string) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(resetPassword(email, token), (error, info) => {
            if(error){
                reject(error);
            }
            resolve(info);
        })
    });
 }


export async function sendPasswordConfirmEmail(email: string, token: string){
    await passwordConfirmEmail(email, token);
}

export async function sendPasswordResetEmail(email: string, token: string){
    await passwordResetEmail(email, token);
}
