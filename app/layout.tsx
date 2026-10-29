import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selvakumar — Senior Full Stack Developer",
  description:
    "Interactive 3D portfolio of Selvakumar S, Senior Full Stack Developer in Chennai, India. Enterprise web applications with React, Next.js, TypeScript, Java, and Spring Boot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
