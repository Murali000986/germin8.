import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Germin8 — Intelligent MCA V3 Automation Platform",
  description: "Enterprise MCA e-filing automation platform for Indian Chartered Accountants, Company Secretaries, and Corporate Law Firms. Sub-second deterministic form injection with zero blind submissions.",
  keywords: ["MCA", "MCA V3", "e-filing", "SPICe+", "AOC-4", "DIR-12", "MGT-7", "automation", "Chartered Accountant", "Company Secretary"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#202020] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
