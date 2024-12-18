import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";

const font = Open_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Discord Nextjs",
    description: "A Next.js application demonstrating Discord-like features",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={cn(font.className, "bg-white dark:bg-[#313338]")}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}
                        storageKey="discord-theme"
                    >
                        <ModalProvider />
                        <QueryProvider>{children}</QueryProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
