import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

// Load Custom Premium Fonts
const hatton = localFont({
  src: [
    { path: '../public/fonts/PP Hatton Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/PP Hatton Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-hatton'
});

const messina = localFont({
  src: [
    { path: '../public/fonts/MessinaSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/MessinaSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/MessinaSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-messina'
});

export const metadata: Metadata = {
  title: "Ausan | Tropical Paradise Resort",
  description: "Experience the ultimate luxury at Ausan Beachfront Resort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hatton.variable} ${messina.variable} antialiased bg-stone-900`}
      >
        <SmoothScrolling>
          <Preloader />
          <Navigation />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
