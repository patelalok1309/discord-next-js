"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const previews = [
    {
        id: "chat",
        title: "Chat Interface",
        emoji: "💬",
        color: "#6D5EF5",
        description: "Rich messaging with reactions, threads & search",
        preview: <ChatPreview />,
    },
    {
        id: "voice",
        title: "Voice Channels",
        emoji: "🎙",
        color: "#00D4AA",
        description: "Crystal clear audio with spatial presence",
        preview: <VoicePreview />,
    },
    {
        id: "team",
        title: "Team Management",
        emoji: "👥",
        color: "#F5945E",
        description: "Roles, permissions & member management",
        preview: <TeamPreview />,
    },
    {
        id: "files",
        title: "File Sharing",
        emoji: "📎",
        color: "#A78BFA",
        description: "Share anything, organized by channel",
        preview: <FilesPreview />,
    },
    {
        id: "notifications",
        title: "Notifications",
        emoji: "🔔",
        color: "#FB7185",
        description: "Smart alerts that respect your focus",
        preview: <NotificationsPreview />,
    },
    {
        id: "meetings",
        title: "Meeting Scheduler",
        emoji: "📅",
        color: "#34D399",
        description: "Schedule and join meetings seamlessly",
        preview: <MeetingsPreview />,
    },
];

export default function ProductCarousel() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="py-24 overflow-hidden">
            <div className="px-6 lg:px-12 mb-12">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3"
                            style={{ color: "hsl(var(--primary))" }}>
                            Platform overview
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight"
                            style={{ color: "hsl(var(--text-primary))" }}>
                            Every tool your team needs
                        </h2>
                        <p className="mt-3 text-base" style={{ color: "hsl(var(--text-muted))" }}>
                            Scroll to explore →
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div
                className="flex gap-5 px-6 lg:px-12 overflow-x-auto pb-6 snap-x snap-mandatory"
                style={{ scrollbarWidth: "thin" }}
            >
                {previews.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                        className="snap-center shrink-0 w-[300px] lg:w-[340px] rounded-2xl overflow-hidden group"
                        style={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                        }}
                        whileHover={{ y: -4, scale: 1.01 }}
                    >
                        {/* Card header */}
                        <div
                            className="px-5 py-4 flex items-center gap-3"
                            style={{
                                background: `${p.color}10`,
                                borderBottom: `1px solid ${p.color}20`,
                            }}
                        >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                                style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                                {p.emoji}
                            </div>
                            <div>
                                <div className="text-sm font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                                    {p.title}
                                </div>
                                <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                                    {p.description}
                                </div>
                            </div>
                        </div>

                        {/* Preview area */}
                        <div className="h-[220px] overflow-hidden p-4">
                            {p.preview}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ChatPreview() {
    return (
        <div className="space-y-2.5">
            {[
                { u: "Alex", c: "#6D5EF5", t: "New update just dropped! 🚀" },
                { u: "Sam", c: "#00D4AA", t: "Testing it now, looks amazing!" },
                { u: "Jordan", c: "#F5945E", t: "The performance improvements are real 🔥" },
            ].map((m) => (
                <div key={m.u} className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                        style={{ background: m.c }}>{m.u[0]}</div>
                    <div>
                        <div className="text-[10px] font-semibold" style={{ color: m.c }}>{m.u}</div>
                        <div className="text-[11px]" style={{ color: "hsl(var(--text-primary))" }}>{m.t}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function VoicePreview() {
    return (
        <div className="flex flex-wrap gap-2 justify-center pt-4">
            {[
                { n: "AK", c: "#6D5EF5", speaking: true },
                { n: "ST", c: "#00D4AA", speaking: false },
                { n: "JR", c: "#F5945E", speaking: true },
                { n: "CL", c: "#A78BFA", speaking: false },
            ].map((p) => (
                <div key={p.n} className="flex flex-col items-center gap-1">
                    <div className="relative">
                        {p.speaking && (
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 rounded-full opacity-30"
                                style={{ background: p.c, transform: "scale(1.4)" }}
                            />
                        )}
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm relative z-10"
                            style={{ background: p.c, boxShadow: p.speaking ? `0 0 0 2px ${p.c}` : "none" }}>
                            {p.n}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function TeamPreview() {
    return (
        <div className="space-y-2">
            {[
                { n: "Alex Kim", role: "Owner", c: "#6D5EF5" },
                { n: "Sam Torres", role: "Admin", c: "#00D4AA" },
                { n: "Jordan R.", role: "Member", c: "#F5945E" },
                { n: "Casey Liu", role: "Member", c: "#A78BFA" },
            ].map((m) => (
                <div key={m.n} className="flex items-center gap-2 p-2 rounded-lg"
                    style={{ background: "hsl(var(--secondary-sidebar))" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: m.c }}>{m.n[0]}</div>
                    <span className="text-[11px] flex-1" style={{ color: "hsl(var(--text-primary))" }}>{m.n}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: `${m.c}15`, color: m.c }}>{m.role}</span>
                </div>
            ))}
        </div>
    );
}

function FilesPreview() {
    return (
        <div className="space-y-2">
            {[
                { n: "design-v3.figma", s: "6.1 MB", i: "🎨" },
                { n: "Q4-roadmap.pdf", s: "2.4 MB", i: "📄" },
                { n: "brand-assets.zip", s: "18 MB", i: "📦" },
                { n: "team-photo.jpg", s: "3.2 MB", i: "🖼️" },
            ].map((f) => (
                <div key={f.n} className="flex items-center gap-2 p-2 rounded-lg"
                    style={{ background: "hsl(var(--secondary-sidebar))" }}>
                    <span className="text-lg">{f.i}</span>
                    <div className="min-w-0">
                        <div className="text-[11px] font-medium truncate" style={{ color: "hsl(var(--text-primary))" }}>
                            {f.n}
                        </div>
                        <div className="text-[9px]" style={{ color: "hsl(var(--text-muted))" }}>{f.s}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function NotificationsPreview() {
    return (
        <div className="space-y-2">
            {[
                { t: "New message in #general", time: "now", dot: "#6D5EF5" },
                { t: "Alex mentioned you", time: "2m", dot: "#00D4AA" },
                { t: "File shared in #design", time: "8m", dot: "#F5945E" },
                { t: "Jordan joined #standup", time: "12m", dot: "#A78BFA" },
            ].map((n) => (
                <div key={n.t} className="flex items-start gap-2.5 p-2 rounded-lg"
                    style={{ background: "hsl(var(--secondary-sidebar))" }}>
                    <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: n.dot }} />
                    <div className="flex-1 min-w-0">
                        <div className="text-[11px] truncate" style={{ color: "hsl(var(--text-primary))" }}>{n.t}</div>
                        <div className="text-[9px]" style={{ color: "hsl(var(--text-muted))" }}>{n.time} ago</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function MeetingsPreview() {
    return (
        <div className="space-y-2">
            {[
                { t: "Design Review", time: "10:00 AM", attendees: 4, c: "#6D5EF5" },
                { t: "Team Standup", time: "11:30 AM", attendees: 8, c: "#00D4AA" },
                { t: "Product Planning", time: "2:00 PM", attendees: 6, c: "#F5945E" },
            ].map((m) => (
                <div key={m.t} className="flex items-center gap-2.5 p-2.5 rounded-lg"
                    style={{ background: "hsl(var(--secondary-sidebar))", borderLeft: `3px solid ${m.c}` }}>
                    <div className="flex-1">
                        <div className="text-[11px] font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{m.t}</div>
                        <div className="text-[9px]" style={{ color: "hsl(var(--text-muted))" }}>{m.time} · {m.attendees} attendees</div>
                    </div>
                    <button className="text-[9px] px-2 py-0.5 rounded"
                        style={{ background: `${m.c}15`, color: m.c }}>Join</button>
                </div>
            ))}
        </div>
    );
}
