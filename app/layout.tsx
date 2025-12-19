import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hatton = localFont({
  src: [
    {
      path: "../public/fonts/PP Hatton Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Hatton Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Hatton Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hatton",
});

const messina = localFont({
  src: [
    {
      path: "../public/fonts/MessinaSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-messina",
});

export const metadata: Metadata = {
  title: "Ausan | Tropical Paradise Resort",
  description: "Experience the ultimate luxury at Ausan, your tropical sanctuary.",
};

import SmoothScrolling from "./components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hatton.variable} ${messina.variable} antialiased`}
      >
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
