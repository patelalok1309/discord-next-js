"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function FinalCTA() {
    const { isSignedIn } = useAuth();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-32 px-6 lg:px-12 relative overflow-hidden">
            {/* Large ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(109,94,245,0.12) 0%, transparent 70%)",
                }}
            />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Floating icon */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-5xl mb-6 inline-block"
                    >
                        ⚡
                    </motion.div>

                    <h2
                        className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
                        style={{ color: "hsl(var(--text-primary))" }}
                    >
                        Everything your team{" "}
                        <span className="hero-gradient-text">needs.</span>
                        <br />
                        Nothing it doesn&apos;t.
                    </h2>

                    <p
                        className="text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
                        style={{ color: "hsl(var(--text-secondary))" }}
                    >
                        Start collaborating faster with a workspace designed for
                        modern teams. Real-time messaging, voice channels, and
                        everything in between.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {isSignedIn ? (
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                <Link href="/setup" className="hero-btn-primary group text-base px-8 py-4">
                                    Open Chatheaven
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                    <Link href="/setup" className="hero-btn-primary group text-base px-8 py-4">
                                        Get Started
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                    <Link href="/sign-in" className="hero-btn-secondary text-base px-8 py-4">
                                        Sign In
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Social proof row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                    >
                        {[
                            { label: "No credit card required" },
                            { label: "Free forever plan" },
                            { label: "Cancel anytime" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 text-sm"
                                style={{ color: "hsl(var(--text-muted))" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                                    <path d="M4.5 7L6.5 9L9.5 5" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {item.label}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade to bg */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
                }}
            />
        </section>
    );
}
