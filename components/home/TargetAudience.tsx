"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const audiences = [
    {
        id: "startups",
        title: "Startups",
        emoji: "🚀",
        tagline: "Move fast, stay aligned",
        desc: "Perfect for early-stage teams that need to iterate quickly. Keep the entire team on the same page without heavyweight tools slowing you down.",
        features: ["Instant setup", "Flexible channels", "No per-seat limits"],
        color: "#6D5EF5",
        grad: "from-[#6D5EF5]/10 to-transparent",
    },
    {
        id: "agencies",
        title: "Agencies",
        emoji: "🏢",
        tagline: "Client-ready workspaces",
        desc: "Manage multiple client projects simultaneously. Create dedicated workspaces for each client with custom channels and permissions.",
        features: ["Multi-workspace", "Client portals", "Role management"],
        color: "#00D4AA",
        grad: "from-[#00D4AA]/10 to-transparent",
    },
    {
        id: "remote",
        title: "Remote Teams",
        emoji: "🌍",
        tagline: "Collaborate across timezones",
        desc: "Designed for distributed teams. Async-friendly messaging, timezone awareness, and rich async communication tools.",
        features: ["Async messaging", "File sharing", "Meeting scheduler"],
        color: "#F5945E",
        grad: "from-[#F5945E]/10 to-transparent",
    },
];

export default function TargetAudience() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-24 px-6 lg:px-12">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "hsl(var(--primary))" }}>
                        Who is it for
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight"
                        style={{ color: "hsl(var(--text-primary))" }}>
                        Designed for{" "}
                        <span className="hero-gradient-text">your team</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {audiences.map((a, i) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.1 + i * 0.12,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 80,
                            }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="relative rounded-3xl p-7 flex flex-col gap-5 overflow-hidden group cursor-default"
                            style={{
                                background: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = `${a.color}40`;
                                el.style.boxShadow = `0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px ${a.color}20`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = "hsl(var(--border))";
                                el.style.boxShadow = "none";
                            }}
                        >
                            {/* BG gradient blob */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${a.color}12 0%, transparent 60%)`,
                                }}
                            />

                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(90deg, ${a.color}, ${a.color}00)` }}
                            />

                            {/* Illustration area */}
                            <div
                                className="w-full h-32 rounded-2xl flex items-center justify-center relative overflow-hidden"
                                style={{ background: `${a.color}0D`, border: `1px solid ${a.color}20` }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                    className="text-6xl"
                                >
                                    {a.emoji}
                                </motion.div>
                                <div
                                    className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{ background: `${a.color}20`, color: a.color }}
                                >
                                    {a.tagline}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--text-primary))" }}>
                                    {a.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-secondary))" }}>
                                    {a.desc}
                                </p>
                            </div>

                            <div className="space-y-2 mt-auto">
                                {a.features.map((feat) => (
                                    <div key={feat} className="flex items-center gap-2 text-sm"
                                        style={{ color: "hsl(var(--text-secondary))" }}>
                                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
