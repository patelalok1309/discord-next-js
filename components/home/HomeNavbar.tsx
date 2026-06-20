"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/theme-toggler";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function HomeNavbar() {
    const { isSignedIn } = useAuth();
    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4"
            style={{
                background: "rgba(var(--background-raw, 226 49% 8%), 0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid hsl(var(--border))",
            }}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
                <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm transition-transform duration-200 group-hover:scale-110"
                    style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                        boxShadow: "0 0 12px rgba(109,94,245,0.4)",
                    }}
                >
                    C
                </div>
                <span className="font-bold text-base" style={{ color: "hsl(var(--text-primary))" }}>
                    Chatheaven
                </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
                {[
                    { label: "Features", href: "#features" },
                    { label: "How it works", href: "#how-it-works" },
                    { label: "For teams", href: "#audiences" },
                ].map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium transition-colors duration-200 hover:text-primary"
                        style={{ color: "hsl(var(--text-secondary))" }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <ModeToggle />
                <Link
                    href="/setup"
                    className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(246,89%,55%))",
                        boxShadow: "0 4px 12px rgba(109,94,245,0.3)",
                    }}
                >
                    {isSignedIn ? "Open Chatheaven →" : "Get Started →"}
                </Link>
                <UserButton
                    appearance={{
                        elements: { avatarBox: "h-8 w-8" },
                    }}
                />
            </div>
        </motion.header>
    );
}
