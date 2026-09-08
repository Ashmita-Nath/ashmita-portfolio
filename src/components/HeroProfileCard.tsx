import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, GraduationCap, Code2, ExternalLink } from "lucide-react";

export default function HeroProfileCard() {
  const [imgSrc, setImgSrc] = useState<string>("/ashmita.jpg");

  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      {/* Ambient background glow behind the card */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(139, 124, 255, 0.35) 0%, rgba(84, 214, 199, 0.3) 50%, rgba(167, 243, 208, 0.25) 100%)",
        }}
        aria-hidden
      />

      {/* Main Glassmorphic Showcase Card */}
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-white/15 p-4 sm:p-5 backdrop-blur-2xl shadow-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(170deg, rgba(22, 29, 41, 0.85) 0%, rgba(14, 19, 27, 0.95) 100%)",
          boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 30px -5px rgba(139, 124, 255, 0.15)",
        }}
      >
        {/* Top Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-4 px-1">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Roles & Research
          </div>

          <div className="flex items-center gap-1 text-[11px] text-muted font-medium">
            <span>Bengaluru, IN</span>
          </div>
        </div>

        {/* Photo Container */}
        <div className="relative aspect-[4/4.7] rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
          <img
            src={imgSrc}
            alt="Ashmita Nath"
            onError={() => {
              // fallback to github avatar if local file is missing
              if (imgSrc !== "https://avatars.githubusercontent.com/u/174636879?v=4") {
                setImgSrc("https://avatars.githubusercontent.com/u/174636879?v=4");
              }
            }}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle gradient vignette at the bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(14, 19, 27, 0.85) 0%, rgba(14, 19, 27, 0.2) 35%, transparent 60%)",
            }}
          />

          {/* Name & Title Overlay */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
            <div>
              <p className="text-white font-display text-lg font-semibold tracking-wide drop-shadow-md">
                Ashmita Nath
              </p>
              <p className="text-xs text-slate-300 drop-shadow flex items-center gap-1.5 mt-0.5">
                <GraduationCap size={13} className="text-accent-2" />
                B.Tech CSE · DSU (2023–2027)
              </p>
            </div>
            <span className="rounded-lg bg-black/40 backdrop-blur-md px-2 py-1 text-[11px] font-medium text-highlight border border-white/10">
              AI / ML & SDE
            </span>
          </div>
        </div>

        {/* Floating Highlight Chips */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 text-accent">
              <Award size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-muted leading-none">Research Paper</div>
              <div className="text-xs font-medium text-ink truncate mt-0.5">ICECA 2026 Author</div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-500/15 text-accent-2">
              <Sparkles size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-muted leading-none">Live Work</div>
              <div className="text-xs font-medium text-ink truncate mt-0.5">3 Deployed Apps</div>
            </div>
          </div>
        </div>

        {/* Quick Tech Badge Row */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-muted">
            <Code2 size={13} className="text-accent-2" />
            <span>Python · React · Scikit-learn · FastAPI</span>
          </div>
          <a
            href="https://github.com/Ashmita-Nath"
            target="_blank"
            rel="noreferrer"
            className="text-accent-2 hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            GitHub <ExternalLink size={11} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
