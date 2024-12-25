import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
