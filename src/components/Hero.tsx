import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import HeroProfileCard from "./HeroProfileCard";
import SocialLinks from "./SocialLinks";

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const headline = "Building intelligent systems, useful products and data-driven experiences.";

export default function Hero() {
  const words = headline.split(" ");

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-40 blur-3xl animate-gradient"
        style={{
          background:
            "conic-gradient(from 180deg, #8B7CFF22, #54D6C722, #A7F3D022, #8B7CFF22)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-[min(1180px,92vw)] grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent-2 mb-6"
          >
            <Sparkles size={13} className="text-accent-2" />
            <span>Ashmita Nath — B.Tech CSE @ Dayananda Sagar University</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] tracking-tight text-ink">
            {words.map((w, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.28em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 text-lg text-muted max-w-[48ch] leading-relaxed"
          >
            Computer Science undergraduate researching applied Machine Learning and building production-ready web applications, systems, and engaging frontend experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="rounded-xl bg-ink text-bg font-medium px-6 py-3 text-sm hover:opacity-90 transition-opacity shadow-lg shadow-white/5"
              style={{ backgroundColor: "var(--color-ink)", color: "var(--color-bg)" }}
            >
              See selected work
            </a>
            <a
              href="#ux"
              className="rounded-xl border border-accent-2/30 bg-accent-2/10 text-accent-2 font-medium px-5 py-3 text-sm hover:bg-accent-2/20 transition-all flex items-center gap-1.5"
            >
              <span>🚀 Live Project Demos</span>
              <ExternalLink size={13} />
            </a>
            <SocialLinks compact />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 lg:mt-0 flex justify-center"
        >
          <HeroProfileCard />
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
