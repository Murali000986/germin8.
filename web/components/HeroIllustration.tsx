import React from "react";
import { CheckCircle2, Zap, Shield, Sparkles, FileText, ChevronRight } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
      
      {/* Decorative Daisy/Floral accents in corners inspired by CVPilot */}
      <div className="absolute -top-10 -left-6 w-24 h-24 pointer-events-none opacity-80 z-10 hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          <circle cx="50" cy="50" r="14" fill="#F5D45C" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="20"
              rx="6"
              ry="16"
              fill="#FFFFFF"
              stroke="#E9E9E9"
              strokeWidth="0.8"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="10" fill="#F1A33B" opacity="0.9" />
        </svg>
      </div>

      <div className="absolute -top-10 -right-6 w-24 h-24 pointer-events-none opacity-80 z-10 hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          <circle cx="50" cy="50" r="14" fill="#F5D45C" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="20"
              rx="6"
              ry="16"
              fill="#FFFFFF"
              stroke="#E9E9E9"
              strokeWidth="0.8"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="10" fill="#F1A33B" opacity="0.9" />
        </svg>
      </div>

      {/* Main Rounded Image Container */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#FFF8E9] via-[#F7F7F7] to-[#E8E8F8] border border-[#E9E9E9] shadow-xl p-8 sm:p-12 min-h-[460px] flex items-center justify-center">
        
        {/* Soft background glow & organic blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#F5D45C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E8E8F8] rounded-full blur-3xl pointer-events-none" />

        {/* Central Illustrated Professional & Laptop Setup */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-6">
          
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#F1A33B] to-[#F5D45C] p-1.5 shadow-lg mb-6">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 120 120" className="w-28 h-28 text-[#202020]" fill="currentColor">
                {/* Clean stylized practitioner portrait */}
                <circle cx="60" cy="45" r="22" fill="#F1A33B" opacity="0.25" />
                <path d="M60 22a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 44c-22 0-40 14-40 32v6h80v-6c0-18-18-32-40-32z" fill="#202020" />
                <path d="M44 32c4-8 28-8 32 0-3 6-29 6-32 0z" fill="#F1A33B" />
              </svg>
            </div>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020] mb-2">
            The Practitioner's Quiet Superpower
          </h3>
          <p className="text-sm sm:text-base text-[#757575] max-w-md">
            Seamlessly autofill statutory MCA V3 e-forms with client vault records in 1.2 seconds.
          </p>

        </div>

        {/* Floating Chip 1: Top Left - 99.8% Precision Score */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#E9E9E9] shadow-md flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#FFF8E9] text-[#F1A33B] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#202020]">
            <span className="text-[#F1A33B] font-bold">99.8%</span> Precision Score
          </div>
        </div>

        {/* Floating Chip 2: Mid Left - Ask MCA Copilot */}
        <div className="absolute bottom-10 left-6 sm:bottom-16 sm:left-10 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E9E9E9] shadow-md flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8E8F8] text-[#202020] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#F1A33B]" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-semibold text-[#202020]">Ask MCA Copilot...</div>
            <div className="text-[10px] text-[#757575]">Fuzzy maps CIN & ROC codes</div>
          </div>
        </div>

        {/* Floating Card 3: Right Side - Supported Forms Card */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E9E9E9] shadow-lg max-w-[240px] text-left hidden sm:block">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E9E9E9]">
            <span className="text-xs font-bold text-[#202020]">Active E-Forms</span>
            <span className="bg-[#FFF8E9] text-[#F1A33B] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F5D45C]">
              Auto-Fill
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#757575]">
            <li className="flex items-center justify-between">
              <span className="font-medium text-[#202020]">SPICe+ Part B</span>
              <span className="text-[10px] text-[#059669] font-semibold">17 Fields ✓</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-[#202020]">Form AOC-4</span>
              <span className="text-[10px] text-[#059669] font-semibold">14 Fields ✓</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-[#202020]">Form DIR-12</span>
              <span className="text-[10px] text-[#059669] font-semibold">12 Fields ✓</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-[#202020]">Form MGT-7</span>
              <span className="text-[10px] text-[#059669] font-semibold">16 Fields ✓</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
