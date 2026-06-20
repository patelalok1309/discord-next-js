"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Layers, Zap, Users } from "lucide-react";

const stats = [
    {
        value: 10000,
        suffix: "+",
        label: "Messages Sent",
        icon: MessageSquare,
        color: "#6D5EF5",
        bg: "rgba(109,94,245,0.08)",
        border: "rgba(109,94,245,0.18)",
    },
    {
        value: 500,
        suffix: "+",
        label: "Active Workspaces",
        icon: Layers,
        color: "#00D4AA",
        bg: "rgba(0,212,170,0.08)",
        border: "rgba(0,212,170,0.18)",
    },
    {
        value: 99.9,
        suffix: "%",
        label: "Uptime Guaranteed",
        icon: Zap,
        color: "#F5945E",
        bg: "rgba(245,148,94,0.08)",
        border: "rgba(245,148,94,0.18)",
    },
    {
        value: 50,
        suffix: "+",
        label: "Teams Collaborating",
        icon: Users,
        color: "#A78BFA",
        bg: "rgba(167,139,250,0.08)",
        border: "rgba(167,139,250,0.18)",
    },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const start = performance.now();

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [inView, value]);

    return (
        <span ref={ref}>
            {value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function StatsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="py-20 px-6 lg:px-12">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "hsl(var(--primary))" }}
                    >
                        Trusted by teams worldwide
                    </p>
                    <h2
                        className="text-3xl lg:text-4xl font-bold"
                        style={{ color: "hsl(var(--text-primary))" }}
                    >
                        Numbers that speak for themselves
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="stat-card group"
                                style={{
                                    background: stat.bg,
                                    border: `1px solid ${stat.border}`,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{
                                        background: `${stat.color}1A`,
                                        border: `1px solid ${stat.color}30`,
                                    }}
                                >
                                    <Icon
                                        size={18}
                                        style={{ color: stat.color }}
                                    />
                                </div>
                                <div
                                    className="text-3xl lg:text-4xl font-extrabold tracking-tight"
                                    style={{ color: stat.color }}
                                >
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <div
                                    className="mt-1 text-sm font-medium"
                                    style={{
                                        color: "hsl(var(--text-secondary))",
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
