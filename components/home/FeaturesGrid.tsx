"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    MessageSquare,
    Mic,
    FileText,
    Users,
    Calendar,
    Shield,
} from "lucide-react";

const features = [
    {
        icon: MessageSquare,
        title: "Real-Time Messaging",
        desc: "Instant conversations with channels and direct messages, powered by WebSockets.",
        color: "#6D5EF5",
        grad: "from-[#6D5EF5]/20 to-transparent",
    },
    {
        icon: Mic,
        title: "Voice Channels",
        desc: "Join voice discussions instantly without creating meetings or sending links.",
        color: "#00D4AA",
        grad: "from-[#00D4AA]/20 to-transparent",
    },
    {
        icon: FileText,
        title: "File Sharing",
        desc: "Share files, images, and documents with your team seamlessly in any channel.",
        color: "#F5945E",
        grad: "from-[#F5945E]/20 to-transparent",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        desc: "Organize conversations around projects, topics, and teams effortlessly.",
        color: "#A78BFA",
        grad: "from-[#A78BFA]/20 to-transparent",
    },
    {
        icon: Calendar,
        title: "Meeting Scheduling",
        desc: "Schedule and manage team meetings seamlessly integrated with your workspace.",
        color: "#FB7185",
        grad: "from-[#FB7185]/20 to-transparent",
    },
    {
        icon: Shield,
        title: "Secure Workspace",
        desc: "Role-based access control and end-to-end encrypted secure collaboration.",
        color: "#34D399",
        grad: "from-[#34D399]/20 to-transparent",
    },
];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, type: "spring", stiffness: 90 },
    },
};

export default function FeaturesGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="features" ref={ref} className="py-24 px-6 lg:px-12">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "hsl(var(--primary))" }}
                    >
                        Everything you need
                    </p>
                    <h2
                        className="text-4xl lg:text-5xl font-bold tracking-tight"
                        style={{ color: "hsl(var(--text-primary))" }}
                    >
                        Built for how teams{" "}
                        <span className="hero-gradient-text">actually work</span>
                    </h2>
                    <p
                        className="mt-4 text-lg max-w-2xl mx-auto"
                        style={{ color: "hsl(var(--text-secondary))" }}
                    >
                        Every feature is designed to reduce friction and keep
                        your team in flow state.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <motion.div
                                key={f.title}
                                variants={item}
                                whileHover={{ y: -4, scale: 1.01 }}
                                className="feature-card group relative overflow-hidden"
                                style={{
                                    background: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "16px",
                                    padding: "28px",
                                    cursor: "default",
                                    transition:
                                        "box-shadow 0.3s ease, border-color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor =
                                        `${f.color}40`;
                                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                                        `0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px ${f.color}20`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor =
                                        "hsl(var(--border))";
                                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                                        "none";
                                }}
                            >
                                {/* Gradient accent on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 0% 0%, ${f.color}10 0%, transparent 60%)`,
                                    }}
                                />

                                {/* Top line accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(90deg, ${f.color}, ${f.color}00)`,
                                    }}
                                />

                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        background: `${f.color}18`,
                                        border: `1px solid ${f.color}30`,
                                    }}
                                >
                                    <Icon size={22} style={{ color: f.color }} />
                                </div>

                                <h3
                                    className="text-lg font-bold mb-2"
                                    style={{
                                        color: "hsl(var(--text-primary))",
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{
                                        color: "hsl(var(--text-secondary))",
                                    }}
                                >
                                    {f.desc}
                                </p>

                                <div
                                    className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ color: f.color }}
                                >
                                    Learn more{" "}
                                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
