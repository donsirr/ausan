"use client";

import Link from "next/link";
import ExperienceSection from "./components/ExperienceSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-teal-200 selection:text-teal-900">

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/beach-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 drop-shadow-md opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', fontFamily: 'var(--font-messina), sans-serif' }}>
            Welcome to Ausan
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight drop-shadow-lg max-w-4xl font-medium" style={{ fontFamily: 'var(--font-hatton), serif' }}>
            Let the <span className="italic">waves</span> be your lullaby, and the <span className="italic">sunrise</span> your private ocean show.
          </h1>

          <p className="text-white/80 text-xs md:text-sm font-medium tracking-[0.1em] uppercase mt-4 max-w-md mx-auto" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
            Wake up steps away from the shore
          </p>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </header>

      {/* Intro Section - Minimal & Clean */}
      <section id="about" className="py-24 px-6 md:px-1 max-w-2xl mx-auto text-center">
        <p className="md:text-[28px] font-serif leading-loose font-light tracking-wide antialiased [-webkit-text-stroke:_1px]" style={{ fontFamily: 'var(--font-hatton), serif' }}>
          Stay in the heart of Port Barton on a 1.5‑kilometer stretch of white‑sand beach, with crystal‑clear water and coconut trees right outside your door.
        </p>
      </section>

      {/* Experience Scroll Section */}
      <ExperienceSection />

      {/* Testimonials & Awards */}
      <section className="py-32 px-6 bg-stone-900 text-stone-300">
        <div className="max-w-6xl mx-auto text-center">

          {/* Awards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 opacity-60 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>General Santos Awards</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Best Premier Resort</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>Golden Globe Awards</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Business Excellence</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>TripAdvisor</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Certificate of Excellence</span>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <span className="absolute -top-12 -left-8 md:-left-16 text-8xl md:text-9xl text-white/5 font-serif select-none leading-none">“</span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-serif italic leading-relaxed mb-8 relative z-10" style={{ fontFamily: 'var(--font-hatton), serif' }}>
              The location couldn’t have been better—right in front of the beach, which made it so easy to enjoy the view and the sound of the waves. The breakfast was also a highlight, with a variety of delicious options to start the day.
            </h3>
            <span className="absolute -bottom-12 -right-8 md:-right-16 text-8xl md:text-9xl text-white/5 font-serif select-none leading-none">”</span>
          </div>

          <cite className="block text-white/50 not-italic tracking-[0.2em] text-xs uppercase mt-12" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
            — Nicola Brescianini, Stayed February 2025
          </cite>
        </div>
      </section>

    </div>
  );
}
