import Link from "next/link";
import ExperienceSection from "./components/ExperienceSection";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            poster="/images/hero.png"
          >
            <source src="/images/beach-loop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Darker overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-90" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
            Welcome
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight drop-shadow-lg max-w-4xl font-medium" style={{ fontFamily: 'var(--font-hatton), serif' }}>
            {/* Feel the <span className="italic">adventure</span>,<br className="hidden md:block" />
            See the beauty of <span className="italic">nature</span> */}
            Let the <span className="italic">waves</span> be your lullaby, and the <span className="italic">sunrise</span> your private ocean show.
          </h1>

          <p className="text-white/80 text-xs md:text-sm font-medium tracking-[0.1em] uppercase mt-4 max-w-md mx-auto" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
            Wake up steps away from the shore
          </p>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      {/* Intro Section - Minimal & Clean */}
      <section className="py-24 px-6 md:px-1 max-w-2xl mx-auto text-center">
        <p className="md:text-[28px] font-serif leading-loose font-light tracking-wide antialiased [-webkit-text-stroke:_1px]" style={{ fontFamily: 'var(--font-hatton), serif' }}>
          Stay in the heart of Port Barton on a 1.5‑kilometer stretch of white‑sand beach, with crystal‑clear water and coconut trees right outside your door.
        </p>
      </section>

      {/* Featured Experiences - Framer Motion Section */}
      <ExperienceSection />

      {/* Call to Action */}
      {/* Testimonials & Awards */}
      <section className="relative py-32 bg-stone-900 text-center px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Awards Row */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-24 opacity-60">
            <div className="flex flex-col items-center space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>General Santos Awards</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Best Premier Resort</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>Golden Globe Awards</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Business Excellence</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>TripAdvisor</span>
              <span className="text-white font-serif italic text-lg opacity-80" style={{ fontFamily: 'var(--font-hatton), serif' }}>Certificate of Excellence</span>
            </div>
          </div>

          {/* Featured Testimonial */}
          <div className="relative mb-12 px-4">
            <span className="absolute top-0 left-0 md:left-10 text-6xl text-white/10 font-serif -translate-y-1/2">“</span>
            <h2 className="text-3xl md:text-5xl text-white leading-snug font-light max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-hatton), serif' }}>
              The location couldn’t have been better—right in front of the beach, which made it so easy to enjoy the view and the sound of the waves. The breakfast was also a highlight, with a variety of delicious options to start the day.
            </h2>
            <span className="absolute bottom-0 right-0 md:right-10 text-6xl text-white/10 font-serif translate-y-1/2 rotate-180">“</span>
          </div>

          <cite className="block text-white/50 not-italic tracking-[0.2em] text-xs uppercase mt-12" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
            — Nicola Brescianini, Stayed February 2025
          </cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-2xl font-serif text-white mb-6 tracking-widest uppercase">Ausan</h4>
            <p className="max-w-sm mb-6">
              A luxury tropical resort redefining the art of relaxation.
              Copyright © {new Date().getFullYear()} Ausan Resorts.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Explore</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white hover:border-b hover:border-white/50 transition-all pb-0.5">The Resort</Link></li>
              <li><Link href="#" className="hover:text-white hover:border-b hover:border-white/50 transition-all pb-0.5">Accommodations</Link></li>
              <li><Link href="#" className="hover:text-white hover:border-b hover:border-white/50 transition-all pb-0.5">Dining</Link></li>
              <li><Link href="#" className="hover:text-white hover:border-b hover:border-white/50 transition-all pb-0.5">Wellness</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Connect</h5>
            <div className="flex space-x-4">
              <Link href="#" className="text-stone-400 hover:text-white transition-colors group">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 A4.902 4.902 0 015.468 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-stone-400 hover:text-white transition-colors group">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-stone-400 hover:text-white transition-colors group">
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </Link>
            </div>
            <div className="mt-6">
              <Link href="#" className="text-sm border-b border-stone-700 hover:text-white hover:border-white transition-colors pb-0.5">
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
