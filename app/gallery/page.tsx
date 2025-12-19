import Image from "next/image";

const galleryImages = [
    { src: "/images/villa.jpg", alt: "Private Ocean Villa", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/dining.jpg", alt: "Beachside Dining", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/spa.jpg", alt: "Wellness Spa", span: "md:col-span-1 md:row-span-2" },
    { src: "/images/hero.png", alt: "Sunset View", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/dining.jpg", alt: "Culinary Delight", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/villa.jpg", alt: "Luxury Interior", span: "md:col-span-1 md:row-span-2" },
    { src: "/images/spa.jpg", alt: "Relaxation Area", span: "md:col-span-2 md:row-span-1" },
];

export default function Gallery() {
    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-teal-200 selection:text-teal-900">

            <div className="pt-32 px-6 md:px-12 pb-20">
                <header className="mb-20 text-center">
                    <span className="text-stone-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: 'var(--font-messina), sans-serif' }}>
                        Visual Journey
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif" style={{ fontFamily: 'var(--font-hatton), serif' }}>
                        Our Gallery
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {galleryImages.map((img, idx) => (
                        <div key={idx} className={`relative overflow-hidden rounded-sm group ${img.span}`}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
