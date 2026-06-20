"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function MessagingShowcase() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <section ref={ref} className="py-24 px-6 lg:px-12 overflow-hidden">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left — copy */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6"
                >
                    <p
                        className="text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "hsl(var(--primary))" }}
                    >
                        Messaging
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
                        style={{ color: "hsl(var(--text-primary))" }}>
                        Conversations that{" "}
                        <span className="hero-gradient-text">stay organized.</span>
                    </h2>
                    <p className="text-lg leading-relaxed"
                        style={{ color: "hsl(var(--text-secondary))" }}>
                        Keep discussions structured using channels, direct
                        messages, threads, and reactions. Everything has a
                        place, nothing gets lost.
                    </p>

                    <div className="flex flex-col gap-3 mt-2">
                        {[
                            { label: "Threaded replies", desc: "Deep dive without cluttering the main channel" },
                            { label: "Rich reactions", desc: "Express yourself with emoji reactions instantly" },
                            { label: "Message search", desc: "Find any message across all channels instantly" },
                        ].map((item) => (
                            <div key={item.label} className="flex gap-3 items-start p-3 rounded-xl"
                                style={{ background: "rgba(109,94,245,0.06)", border: "1px solid rgba(109,94,245,0.12)" }}>
                                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                    style={{ background: "hsl(var(--primary))" }} />
                                <div>
                                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-primary))" }}>
                                        {item.label}
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — chat preview */}
                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="relative"
                >
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: "hsl(var(--chat-area))",
                            border: "1px solid hsl(var(--border))",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(109,94,245,0.12)",
                        }}
                    >
                        {/* Channel header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b"
                            style={{ background: "hsl(var(--secondary-sidebar))", borderColor: "hsl(var(--border))" }}>
                            <span style={{ color: "hsl(var(--text-muted))", fontWeight: 700 }}>#</span>
                            <span className="font-bold text-sm" style={{ color: "hsl(var(--text-primary))" }}>design</span>
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "rgba(0,212,170,0.12)", color: "hsl(var(--accent))" }}>
                                3 online
                            </span>
                        </div>

                        {/* Messages */}
                        <div className="p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                                        style={{ background: msg.color }}>
                                        {msg.author[0]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-xs font-semibold" style={{ color: msg.color }}>
                                                {msg.author}
                                            </span>
                                            <span className="text-[10px]" style={{ color: "hsl(var(--text-muted))" }}>
                                                {msg.time}
                                            </span>
                                        </div>
                                        <div className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-primary))" }}>
                                            {msg.text}
                                        </div>
                                        {msg.image && (
                                            <div className="mt-2 rounded-lg overflow-hidden w-48 h-28 flex items-center justify-center"
                                                style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                                                <div className="text-center">
                                                    <div className="text-3xl mb-1">🖼️</div>
                                                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>design-v3.png</div>
                                                </div>
                                            </div>
                                        )}
                                        {msg.thread && (
                                            <button className="mt-2 text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                                                style={{ background: "rgba(109,94,245,0.08)", color: "hsl(var(--primary))", border: "1px solid rgba(109,94,245,0.15)" }}>
                                                💬 {msg.thread} replies · View thread
                                            </button>
                                        )}
                                        {msg.reactions && (
                                            <div className="flex gap-1.5 mt-2">
                                                {msg.reactions.map((r) => (
                                                    <span key={r} className="px-2 py-0.5 rounded-full text-xs"
                                                        style={{ background: "rgba(109,94,245,0.1)", border: "1px solid rgba(109,94,245,0.2)" }}>
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Glow */}
                    <div className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full"
                        style={{ background: "hsl(var(--primary))" }} />
                </motion.div>
            </div>
        </section>
    );
}

const messages = [
    {
        author: "Alex K.", color: "#6D5EF5", time: "10:31 AM",
        text: "Just uploaded the new mockups for review 👇",
        image: true, reactions: ["👍 4", "🔥 2"], thread: null,
    },
    {
        author: "Sam T.", color: "#00D4AA", time: "10:33 AM",
        text: "These look incredible! The color palette is exactly right. Starting a thread for feedback.",
        image: false, reactions: ["❤️ 3"], thread: 4,
    },
    {
        author: "Jordan R.", color: "#F5945E", time: "10:36 AM",
        text: "Agreed! Can we discuss the typography choices in the thread? @alex",
        image: false, reactions: ["👀 2", "✅ 1"], thread: null,
    },
];
