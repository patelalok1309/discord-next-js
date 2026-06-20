"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Create Workspace",
        desc: "Set up your team workspace in under 30 seconds. No credit card required.",
        icon: "🏗️",
        color: "#6D5EF5",
    },
    {
        num: "02",
        title: "Invite Team Members",
        desc: "Send invite links or email invitations. Your team joins instantly.",
        icon: "✉️",
        color: "#00D4AA",
    },
    {
        num: "03",
        title: "Create Channels",
        desc: "Organize conversations into channels for projects, topics, and teams.",
        icon: "📢",
        color: "#F5945E",
    },
    {
        num: "04",
        title: "Start Collaborating",
        desc: "Chat, share files, jump into voice channels, and work together in real time.",
        icon: "⚡",
        color: "#A78BFA",
    },
    {
        num: "05",
        title: "Scale Communication",
        desc: "Add more members, create more channels, and grow without limits.",
        icon: "🚀",
        color: "#FB7185",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-24 px-6 lg:px-12">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "hsl(var(--primary))" }}>
                        Getting started
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight"
                        style={{ color: "hsl(var(--text-primary))" }}>
                        Up and running{" "}
                        <span className="hero-gradient-text">in minutes</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[27px] top-8 bottom-8 w-0.5"
                        style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--accent)), transparent)" }} />

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    delay: 0.1 + i * 0.15,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 90,
                                }}
                                className="flex gap-6 group"
                            >
                                {/* Step node */}
                                <div className="relative flex-shrink-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={inView ? { scale: 1 } : {}}
                                        transition={{
                                            delay: 0.2 + i * 0.15,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl relative z-10 transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: `${step.color}18`,
                                            border: `2px solid ${step.color}40`,
                                            boxShadow: `0 0 0 0 ${step.color}30`,
                                        }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                </div>

                                {/* Step content */}
                                <div
                                    className="flex-1 p-5 rounded-2xl mb-2 transition-all duration-300 group-hover:scale-[1.01]"
                                    style={{
                                        background: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = `${step.color}40`;
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px ${step.color}15`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--border))";
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold tabular-nums"
                                            style={{ color: step.color }}>
                                            {step.num}
                                        </span>
                                        <h3 className="text-base font-bold"
                                            style={{ color: "hsl(var(--text-primary))" }}>
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm leading-relaxed"
                                        style={{ color: "hsl(var(--text-secondary))" }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
