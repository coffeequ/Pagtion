import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner"
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { SessionProvider } from "next-auth/react";
import { ProviderLb } from "@/components/providers/liveb-provider";
import { auth } from "@/auth";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Pagtion",
  description: "Пагноушен. Дипломный проект",
  icons:{
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/ppl-full-logo.svg",
        href: "/ppl-full-logo.svg"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/ppl-only-logo-dark",
        href: "/ppl-only-logo-dark",
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
      <ProviderLb>
        <SessionProvider session={session}>
            <EdgeStoreProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="pagnotion-theme">
                <Toaster position="bottom-center"/>
                <ModalProvider/>
                {children}
              </ThemeProvider>
            </EdgeStoreProvider>
          </SessionProvider>
        </ProviderLb>
      </body>
    </html>
  );
}
