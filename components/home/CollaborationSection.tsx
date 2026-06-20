"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Activity, Bell, Users } from "lucide-react";

const files = [
    { name: "Q4-roadmap.pdf", size: "2.4 MB", icon: "📄", color: "#6D5EF5" },
    { name: "brand-assets.zip", size: "18 MB", icon: "📦", color: "#00D4AA" },
    { name: "design-v3.figma", size: "6.1 MB", icon: "🎨", color: "#F5945E" },
];

const activity = [
    { user: "Alex K.", action: "shared a file", time: "2m ago", icon: "📎", color: "#6D5EF5" },
    { user: "Sam T.", action: "created channel #product", time: "8m ago", icon: "➕", color: "#00D4AA" },
    { user: "Jordan R.", action: "pinned a message", time: "15m ago", icon: "📌", color: "#F5945E" },
    { user: "Casey L.", action: "updated workspace settings", time: "1h ago", icon: "⚙️", color: "#A78BFA" },
];

const members = [
    { name: "Alex", color: "#6D5EF5", status: "online", role: "Owner" },
    { name: "Sam", color: "#00D4AA", status: "online", role: "Admin" },
    { name: "Jordan", color: "#F5945E", status: "idle", role: "Member" },
    { name: "Casey", color: "#A78BFA", status: "online", role: "Member" },
    { name: "Morgan", color: "#FB7185", status: "dnd", role: "Member" },
];

export default function CollaborationSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-24 px-6 lg:px-12 overflow-hidden">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left — previews */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="space-y-4"
                >
                    {/* Members card */}
                    <div
                        className="rounded-2xl p-5"
                        style={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Users size={14} style={{ color: "hsl(var(--primary))" }} />
                            <span className="text-xs font-bold uppercase tracking-wide"
                                style={{ color: "hsl(var(--text-muted))" }}>
                                Team Members
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {members.map((m, i) => (
                                <motion.div
                                    key={m.name}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.08 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                            style={{ background: m.color }}>
                                            {m.name[0]}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                                            style={{
                                                background: m.status === "online" ? "#22c55e" : m.status === "idle" ? "#eab308" : "#ef4444",
                                                borderColor: "hsl(var(--card))",
                                            }} />
                                    </div>
                                    <span className="text-sm font-medium flex-1" style={{ color: "hsl(var(--text-primary))" }}>
                                        {m.name}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded"
                                        style={{ background: `${m.color}15`, color: m.color }}>
                                        {m.role}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Files card */}
                        <div className="rounded-2xl p-4"
                            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={13} style={{ color: "hsl(var(--accent))" }} />
                                <span className="text-xs font-bold uppercase tracking-wide"
                                    style={{ color: "hsl(var(--text-muted))" }}>
                                    Shared Files
                                </span>
                            </div>
                            <div className="space-y-2">
                                {files.map((f) => (
                                    <div key={f.name} className="flex items-center gap-2">
                                        <span className="text-base">{f.icon}</span>
                                        <div className="min-w-0">
                                            <div className="text-[11px] font-medium truncate"
                                                style={{ color: "hsl(var(--text-primary))" }}>
                                                {f.name}
                                            </div>
                                            <div className="text-[9px]" style={{ color: "hsl(var(--text-muted))" }}>
                                                {f.size}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity card */}
                        <div className="rounded-2xl p-4"
                            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Activity size={13} style={{ color: "#F5945E" }} />
                                <span className="text-xs font-bold uppercase tracking-wide"
                                    style={{ color: "hsl(var(--text-muted))" }}>
                                    Activity
                                </span>
                            </div>
                            <div className="space-y-2">
                                {activity.slice(0, 3).map((a) => (
                                    <div key={a.user + a.action} className="flex items-start gap-1.5">
                                        <span className="text-sm">{a.icon}</span>
                                        <div>
                                            <span className="text-[10px] font-semibold" style={{ color: a.color }}>
                                                {a.user}
                                            </span>
                                            <span className="text-[10px]" style={{ color: "hsl(var(--text-muted))" }}>
                                                {" "}{a.action}
                                            </span>
                                            <div className="text-[9px]" style={{ color: "hsl(var(--text-placeholder))" }}>
                                                {a.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right — copy */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="flex flex-col gap-6"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "hsl(var(--accent))" }}>
                        Collaboration
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
                        style={{ color: "hsl(var(--text-primary))" }}>
                        Built for{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #00D4AA, #6D5EF5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            modern teams.
                        </span>
                    </h2>
                    <p className="text-lg leading-relaxed"
                        style={{ color: "hsl(var(--text-secondary))" }}>
                        Keep communication, collaboration, and knowledge sharing
                        in a single place. See who&apos;s online, what&apos;s
                        being shared, and what your team is working on.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {[
                            { icon: "👥", label: "Member presence", desc: "See who's online in real time" },
                            { icon: "📎", label: "File sharing", desc: "Share files in any channel" },
                            { icon: "🔔", label: "Smart notifications", desc: "Only get notified when it matters" },
                            { icon: "📊", label: "Team activity", desc: "Full audit trail for your workspace" },
                        ].map((item) => (
                            <div key={item.label}
                                className="p-3.5 rounded-xl"
                                style={{
                                    background: "rgba(0,212,170,0.05)",
                                    border: "1px solid rgba(0,212,170,0.1)",
                                }}>
                                <div className="text-xl mb-2">{item.icon}</div>
                                <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-primary))" }}>
                                    {item.label}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
