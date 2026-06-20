"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const participants = [
    { name: "Alex Kim", initials: "AK", color: "#6D5EF5", speaking: true, role: "Host" },
    { name: "Sam Torres", initials: "ST", color: "#00D4AA", speaking: false, role: "Designer" },
    { name: "Jordan R.", initials: "JR", color: "#F5945E", speaking: true, role: "Dev" },
    { name: "Casey Liu", initials: "CL", color: "#A78BFA", speaking: false, role: "PM" },
    { name: "Morgan W.", initials: "MW", color: "#FB7185", speaking: false, role: "QA" },
];

export default function VoiceChannelShowcase() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="py-24 px-6 lg:px-12 overflow-hidden"
        >
            <div className="container mx-auto">
                {/* Centered heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "hsl(var(--accent))" }}
                    >
                        Voice Channels
                    </p>
                    <h2
                        className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
                        style={{ color: "hsl(var(--text-primary))" }}
                    >
                        Jump into voice{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #00D4AA, #6D5EF5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            instantly.
                        </span>
                    </h2>
                    <p
                        className="mt-4 text-lg max-w-xl mx-auto leading-relaxed"
                        style={{ color: "hsl(var(--text-secondary))" }}
                    >
                        No meeting links. No setup. No friction. Just click and
                        you&apos;re in.
                    </p>
                </motion.div>

                {/* Voice room card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="max-w-3xl mx-auto"
                >
                    <div
                        className="rounded-3xl overflow-hidden"
                        style={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            boxShadow:
                                "0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,212,170,0.12)",
                        }}
                    >
                        {/* Voice room header */}
                        <div
                            className="px-6 py-4 flex items-center justify-between"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(0,212,170,0.08), rgba(109,94,245,0.08))",
                                borderBottom: "1px solid hsl(var(--border))",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                    style={{
                                        background: "rgba(0,212,170,0.12)",
                                        border: "1px solid rgba(0,212,170,0.2)",
                                    }}
                                >
                                    🎙
                                </div>
                                <div>
                                    <div
                                        className="font-bold text-base"
                                        style={{
                                            color: "hsl(var(--text-primary))",
                                        }}
                                    >
                                        #standup
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{
                                            color: "hsl(var(--text-muted))",
                                        }}
                                    >
                                        Voice Channel · 5 participants
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: "hsl(var(--accent))" }}
                                />
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: "hsl(var(--accent))" }}
                                >
                                    LIVE
                                </span>
                            </div>
                        </div>

                        {/* Participants grid */}
                        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {participants.map((p, i) => (
                                <motion.div
                                    key={p.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={
                                        inView
                                            ? { opacity: 1, scale: 1 }
                                            : {}
                                    }
                                    transition={{
                                        delay: 0.3 + i * 0.1,
                                        type: "spring",
                                        stiffness: 120,
                                    }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="relative">
                                        {/* Speaking ring */}
                                        {p.speaking && (
                                            <motion.div
                                                animate={{ scale: [1, 1.25, 1] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.3,
                                                }}
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: `${p.color}30`,
                                                    transform: "scale(1.15)",
                                                }}
                                            />
                                        )}
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm relative z-10"
                                            style={{
                                                background: p.color,
                                                boxShadow: p.speaking
                                                    ? `0 0 0 3px ${p.color}60, 0 8px 24px ${p.color}40`
                                                    : "none",
                                            }}
                                        >
                                            {p.initials}
                                        </div>

                                        {/* Speaking mic indicator */}
                                        {p.speaking && (
                                            <motion.div
                                                animate={{
                                                    opacity: [0.6, 1, 0.6],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                }}
                                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-20"
                                                style={{
                                                    background:
                                                        "hsl(var(--accent))",
                                                    border: "2px solid hsl(var(--card))",
                                                }}
                                            >
                                                🎙
                                            </motion.div>
                                        )}

                                        {/* Online dot */}
                                        {!p.speaking && (
                                            <div
                                                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 z-20"
                                                style={{
                                                    background: "#22c55e",
                                                    borderColor:
                                                        "hsl(var(--card))",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <div
                                            className="text-xs font-semibold"
                                            style={{
                                                color: "hsl(var(--text-primary))",
                                            }}
                                        >
                                            {p.name.split(" ")[0]}
                                        </div>
                                        <div
                                            className="text-[10px]"
                                            style={{
                                                color: "hsl(var(--text-muted))",
                                            }}
                                        >
                                            {p.role}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Voice controls */}
                        <div
                            className="px-6 py-4 flex items-center justify-center gap-4"
                            style={{
                                borderTop: "1px solid hsl(var(--border))",
                                background: "hsl(var(--secondary-sidebar))",
                            }}
                        >
                            {[
                                { icon: "🎙", label: "Mute", active: true, color: "hsl(var(--primary))" },
                                { icon: "🔊", label: "Deafen", active: false, color: "hsl(var(--text-muted))" },
                                { icon: "📹", label: "Video", active: false, color: "hsl(var(--text-muted))" },
                                { icon: "🖥️", label: "Share", active: false, color: "hsl(var(--text-muted))" },
                            ].map((ctrl) => (
                                <button
                                    key={ctrl.label}
                                    className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                                    style={{
                                        background: ctrl.active
                                            ? "rgba(109,94,245,0.15)"
                                            : "transparent",
                                        border: ctrl.active
                                            ? "1px solid rgba(109,94,245,0.25)"
                                            : "1px solid transparent",
                                    }}
                                >
                                    <span className="text-lg">{ctrl.icon}</span>
                                    <span
                                        className="text-[9px] font-semibold"
                                        style={{ color: ctrl.color }}
                                    >
                                        {ctrl.label}
                                    </span>
                                </button>
                            ))}
                            <button
                                className="ml-4 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:scale-105"
                                style={{ background: "hsl(var(--destructive))" }}
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Feature pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mt-10"
                >
                    {["No scheduling needed", "HD audio quality", "Screen sharing", "Spatial audio", "Up to 50 participants"].map((pill) => (
                        <span
                            key={pill}
                            className="px-4 py-1.5 rounded-full text-xs font-semibold"
                            style={{
                                background: "rgba(0,212,170,0.08)",
                                border: "1px solid rgba(0,212,170,0.2)",
                                color: "hsl(var(--accent))",
                            }}
                        >
                            ✓ {pill}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
