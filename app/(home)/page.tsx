"use client";

import HomeNavbar from "@/components/home/HomeNavbar";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import MessagingShowcase from "@/components/home/MessagingShowcase";
import VoiceChannelShowcase from "@/components/home/VoiceChannelShowcase";
import CollaborationSection from "@/components/home/CollaborationSection";
import HowItWorks from "@/components/home/HowItWorks";
import ProductCarousel from "@/components/home/ProductCarousel";
import TargetAudience from "@/components/home/TargetAudience";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
    return (
        <div className="home-page relative overflow-x-hidden">
            <HomeNavbar />

            {/* Ambient background layers */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-60"
                    style={{ background: "radial-gradient(circle, rgba(109,94,245,0.12) 0%, transparent 70%)" }} />
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-50"
                    style={{ background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)" }} />
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-40"
                    style={{ background: "radial-gradient(circle, rgba(109,94,245,0.07) 0%, transparent 70%)" }} />
            </div>

            <main className="relative z-10 pt-20">
                <HeroSection />
                <StatsSection />
                <FeaturesGrid />
                <MessagingShowcase />
                <VoiceChannelShowcase />
                <CollaborationSection />
                <HowItWorks />
                <ProductCarousel />
                <TargetAudience />
                <FinalCTA />
            </main>
        </div>
    );
}
