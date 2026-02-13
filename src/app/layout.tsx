import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ONIMIX | Stream Anime, Movies & Series Online",
  description: "Watch your favorite anime, movies, and series online. ONIMIX is your ultimate streaming destination with thousands of titles.",
  keywords: "anime, streaming, movies, series, watch online, ONIMIX, animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
