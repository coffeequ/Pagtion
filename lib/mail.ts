import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async(email: string, token: string) => {
    const resetLink = `http://pagtion-vercel-app/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Восстановление пароля",
        html: `
            <p>
                <a href="${resetLink}"> нажмите </a> для восстановления пароля.
            </p>
        `
    });
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://pagtion-vercel-app/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Подтверждения почты",
        html: `
            <p>
                <a href="${confirmLink}"> нажмите</a> для подтверждения почты.
            </p>
        `
    });
}