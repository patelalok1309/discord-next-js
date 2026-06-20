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
    title: "Chatheaven",
    description: "A Next.js application demonstrating Chatheaven chat features",
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
                    className={cn(font.className, "bg-background text-foreground")}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}
                        storageKey="chatheaven-theme"
                    >
                        <ModalProvider />
                        <QueryProvider>{children}</QueryProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
