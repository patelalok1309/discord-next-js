"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function HeroSection() {
    const { isSignedIn } = useAuth();
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Hero grid background */}
            <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left — Copy */}
                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium w-fit"
                        style={{
                            background: "rgba(109,94,245,0.12)",
                            border: "1px solid rgba(109,94,245,0.25)",
                            color: "hsl(var(--primary))",
                        }}
                    >
                        <Zap size={14} className="fill-current" />
                        Now in public beta — free forever
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
                        >
                            Team{" "}
                            <span className="hero-gradient-text">
                                communication
                            </span>{" "}
                            without the chaos.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.22 }}
                            className="text-lg lg:text-xl leading-relaxed max-w-[520px]"
                            style={{ color: "hsl(var(--text-secondary))" }}
                        >
                            Real-time messaging, voice channels, file sharing,
                            meetings, and collaboration in one unified workspace.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.34 }}
                        className="flex flex-wrap gap-3"
                    >
                        <Link href="/setup" className="hero-btn-primary group">
                            {isSignedIn ? "Open Chatheaven" : "Get Started"}
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </Link>
                        <a href="#features" className="hero-btn-secondary">
                            Explore Features
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center gap-6 pt-2"
                    >
                        {[
                            { value: "10k+", label: "Messages/day" },
                            { value: "500+", label: "Workspaces" },
                            { value: "99.9%", label: "Uptime" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <span
                                    className="text-xl font-bold"
                                    style={{ color: "hsl(var(--primary))" }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className="text-xs"
                                    style={{
                                        color: "hsl(var(--text-muted))",
                                    }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — Interactive mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
                    className="relative hidden lg:flex justify-center items-center"
                >
                    <HeroMockup />
                </motion.div>
            </div>
        </section>
    );
}

function HeroMockup() {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[520px]"
        >
            {/* Main app window */}
            <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    background: "hsl(var(--sidebar))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow:
                        "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(109,94,245,0.15)",
                }}
            >
                {/* Window chrome */}
                <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{
                        background: "hsl(var(--background))",
                        borderBottom: "1px solid hsl(var(--border))",
                    }}
                >
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
                        <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
                    </div>
                    <div
                        className="flex-1 mx-4 py-1 px-3 rounded-md text-xs text-center"
                        style={{
                            background: "hsl(var(--card))",
                            color: "hsl(var(--text-muted))",
                        }}
                    >
                        chatheaven.app/general
                    </div>
                </div>

                <div className="flex h-[380px]">
                    {/* Sidebar */}
                    <div
                        className="w-[180px] flex flex-col py-3 gap-1 shrink-0"
                        style={{
                            background: "hsl(var(--secondary-sidebar))",
                            borderRight: "1px solid hsl(var(--border))",
                        }}
                    >
                        <div
                            className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "hsl(var(--text-muted))" }}
                        >
                            Text Channels
                        </div>
                        {["general", "design", "engineering", "product"].map(
                            (ch, i) => (
                                <div
                                    key={ch}
                                    className="mx-2 px-2 py-1 rounded-md flex items-center gap-1.5 text-[11px] font-medium"
                                    style={{
                                        background:
                                            i === 0
                                                ? "rgba(109,94,245,0.15)"
                                                : "transparent",
                                        color:
                                            i === 0
                                                ? "hsl(var(--primary))"
                                                : "hsl(var(--text-secondary))",
                                    }}
                                >
                                    <span style={{ opacity: 0.6 }}>#</span>
                                    {ch}
                                    {i === 1 && (
                                        <span
                                            className="ml-auto w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                                            style={{
                                                background:
                                                    "hsl(var(--primary))",
                                            }}
                                        >
                                            3
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                        <div
                            className="px-3 pt-3 pb-2 text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "hsl(var(--text-muted))" }}
                        >
                            Voice Channels
                        </div>
                        {["standup", "breakout"].map((ch, i) => (
                            <div
                                key={ch}
                                className="mx-2 px-2 py-1 rounded-md flex items-center gap-1.5 text-[11px]"
                                style={{
                                    color: "hsl(var(--text-secondary))",
                                }}
                            >
                                <span style={{ color: "hsl(var(--accent))", fontSize: 10 }}>▶</span>
                                {ch}
                                {i === 0 && (
                                    <span
                                        className="ml-auto text-[9px] px-1 rounded"
                                        style={{
                                            background: "rgba(0,212,170,0.15)",
                                            color: "hsl(var(--accent))",
                                        }}
                                    >
                                        2
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className="mt-auto px-3 pt-2 border-t border-divider/50">
                            <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--text-muted))" }}>Members — 4</div>
                            {[
                                { name: "Alex K.", color: "#6D5EF5", status: "online" },
                                { name: "Sam T.", color: "#00D4AA", status: "online" },
                                { name: "Jordan R.", color: "#F5945E", status: "idle" },
                            ].map((m) => (
                                <div key={m.name} className="flex items-center gap-1.5 mb-1.5">
                                    <div className="relative">
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                                            style={{ background: m.color }}
                                        >
                                            {m.name[0]}
                                        </div>
                                        <div
                                            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-sidebar"
                                            style={{
                                                background: m.status === "online" ? "#22c55e" : "#eab308",
                                            }}
                                        />
                                    </div>
                                    <span className="text-[10px]" style={{ color: "hsl(var(--text-secondary))" }}>
                                        {m.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat area */}
                    <div
                        className="flex-1 flex flex-col"
                        style={{ background: "hsl(var(--chat-area))" }}
                    >
                        {/* Chat header */}
                        <div
                            className="flex items-center gap-2 px-4 py-2.5 border-b"
                            style={{ borderColor: "hsl(var(--border))" }}
                        >
                            <span style={{ color: "hsl(var(--text-muted))" }}>
                                #
                            </span>
                            <span className="font-semibold text-sm">
                                general
                            </span>
                            <span
                                className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                    background: "rgba(0,212,170,0.12)",
                                    color: "hsl(var(--accent))",
                                }}
                            >
                                4 online
                            </span>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
                            {[
                                {
                                    author: "Alex K.",
                                    color: "#6D5EF5",
                                    text: "Hey team! Just pushed the new design system update 🎨",
                                    time: "9:41 AM",
                                    reactions: ["👍 3", "🎉 2"],
                                },
                                {
                                    author: "Sam T.",
                                    color: "#00D4AA",
                                    text: "Looks amazing! The color tokens are 🔥",
                                    time: "9:43 AM",
                                    reactions: [],
                                },
                                {
                                    author: "Jordan R.",
                                    color: "#F5945E",
                                    text: "Can we jump into voice to review? I'm in #standup",
                                    time: "9:44 AM",
                                    reactions: ["👋 1"],
                                },
                            ].map((msg) => (
                                <div key={msg.text} className="flex gap-2.5">
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                                        style={{ background: msg.color }}
                                    >
                                        {msg.author[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <span
                                                className="text-[11px] font-semibold"
                                                style={{ color: msg.color }}
                                            >
                                                {msg.author}
                                            </span>
                                            <span
                                                className="text-[9px]"
                                                style={{
                                                    color: "hsl(var(--text-muted))",
                                                }}
                                            >
                                                {msg.time}
                                            </span>
                                        </div>
                                        <p
                                            className="text-[11px] leading-relaxed"
                                            style={{
                                                color: "hsl(var(--text-primary))",
                                            }}
                                        >
                                            {msg.text}
                                        </p>
                                        {msg.reactions.length > 0 && (
                                            <div className="flex gap-1 mt-1">
                                                {msg.reactions.map((r) => (
                                                    <span
                                                        key={r}
                                                        className="px-1.5 py-0.5 rounded-full text-[9px]"
                                                        style={{
                                                            background:
                                                                "rgba(109,94,245,0.1)",
                                                            border: "1px solid rgba(109,94,245,0.2)",
                                                        }}
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="px-3 pb-3">
                            <div
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px]"
                                style={{
                                    background: "hsl(var(--input))",
                                    border: "1px solid hsl(var(--border))",
                                    color: "hsl(var(--text-placeholder))",
                                }}
                            >
                                + Message #general
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating notification card */}
            <motion.div
                initial={{ opacity: 0, x: 40, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -right-8 z-10 px-3 py-2.5 rounded-xl text-[11px] font-medium shadow-lg flex items-center gap-2"
                style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(109,94,245,0.1)",
                }}
            >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ background: "#6D5EF5" }}>A</div>
                <div>
                    <div style={{ color: "hsl(var(--text-primary))" }}>New message in #design</div>
                    <div style={{ color: "hsl(var(--text-muted))" }}>just now</div>
                </div>
                <div className="w-2 h-2 rounded-full ml-1" style={{ background: "hsl(var(--primary))" }} />
            </motion.div>

            {/* Floating voice card */}
            <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-6 -left-10 z-10 px-3 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5"
                style={{
                    background: "hsl(var(--card))",
                    border: "1px solid rgba(0,212,170,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2), 0 0 12px rgba(0,212,170,0.15)",
                }}
            >
                <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "hsl(var(--accent))" }}
                >
                    S
                </div>
                <div>
                    <div className="text-[10px] font-semibold" style={{ color: "hsl(var(--accent))" }}>
                        🎙 Speaking in #standup
                    </div>
                    <div className="text-[9px]" style={{ color: "hsl(var(--text-muted))" }}>
                        Sam T. · 2 others listening
                    </div>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: "hsl(var(--accent))" }}
                />
            </motion.div>
        </motion.div>
    );
}
