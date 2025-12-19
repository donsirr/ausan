import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-300">
        <button className="group flex items-center space-x-3 text-white hover:text-white/80 transition-colors">
          <div className="flex flex-col space-y-1.5 w-6">
            <span className="block w-full h-px bg-current group-hover:w-4 transition-all duration-300"></span>
            <span className="block w-full h-px bg-current"></span>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase hidden md:inline-block">Menu</span>
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href="/" className="flex flex-col items-center group">
            {/* Simple Logo Placeholder */}
            <div className="mb-2 w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
              <span className="font-serif italic text-white text-lg">A</span>
            </div>
            <span className="text-lg font-serif text-white tracking-[0.3em] uppercase group-hover:opacity-80 transition-opacity">Ausan</span>
          </Link>
        </div>

        <button className="border border-white/30 text-white px-6 py-2 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all backdrop-blur-sm">
          Contact us
        </button>
      </nav>

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
          <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-90">
            Welcome
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 leading-tight drop-shadow-lg max-w-5xl">
            A sanctuary of <br className="hidden md:block" />
            <span className="italic">endless possibilities</span>
          </h1>

          <p className="text-white/80 text-xs md:text-sm font-medium tracking-[0.1em] uppercase mt-4 max-w-md mx-auto">
            A Tropical Paradise Resort Experience
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
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-700 leading-relaxed font-light tracking-wide antialiased" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Set on the untouched shores of a private tropical sanctuary, <span className="font-normal text-stone-900">Ausan</span> encompasses an expanse of pristine beachfront surrounded by wild and vibrant nature. Serene yet refined, Ausan embodies a soul-soothing, luxurious lifestyle where the ocean is your only neighbor.
        </p>
      </section>

      {/* Featured Experiences Grid */}
      <section className="py-24 bg-stone-100" id="experiences">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer">
              <Image
                src="/images/villa.png"
                alt="Private Villa"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">Private Villas</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  Wake up to the sound of waves in your own private sanctuary over the water.
                </p>
                <span className="inline-block border-b border-white pb-1 text-xs tracking-widest uppercase group-hover:border-teal-400 group-hover:text-teal-400 transition-colors">
                  Discover More
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer md:-mt-12"> {/* Stagger effect */}
              <Image
                src="/images/dining.png"
                alt="Beach Dining"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">Gourmet Dining</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  Savor exquisite flavors freshly prepared by our world-class chefs under the stars.
                </p>
                <span className="inline-block border-b border-white pb-1 text-xs tracking-widest uppercase group-hover:border-teal-400 group-hover:text-teal-400 transition-colors">
                  View Menus
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer">
              <Image
                src="/images/spa.png"
                alt="Luxury Spa"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">Wellness & Spa</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  Rejuvenate your body and mind with treatments inspired by ancient island traditions.
                </p>
                <span className="inline-block border-b border-white pb-1 text-xs tracking-widest uppercase group-hover:border-teal-400 group-hover:text-teal-400 transition-colors">
                  Relax Now
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 flex items-center justify-center bg-teal-900 overflow-hidden">
        {/* Abstract shapes/decoration could go here */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
            Your Infinite Horizon Awaits
          </h2>
          <p className="text-teal-100 text-lg mb-10">
            Don't just dream of paradise. Live it. Book your stay today and unlock exclusive seasonal offers.
          </p>
          <button className="bg-white text-teal-900 px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-teal-50 transition-colors shadow-2xl">
            Begin Your Journey
          </button>
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
              <li><Link href="#" className="hover:text-white transition-colors">The Resort</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Accommodations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dining</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wellness</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Connect</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Newsletter</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
