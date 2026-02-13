import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ONIMIX TECH | Engineering Intelligent Systems For The Future",
  description: "AI • Automation • Cyber Infrastructure • Digital Evolution - ONIMIX TECH builds next-generation AI and innovation solutions.",
  keywords: "AI, Automation, Cybersecurity, Web Development, Cloud Infrastructure, Data Intelligence",
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
