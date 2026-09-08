import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const buttons = [
  { href: "mailto:ashmitanath463@gmail.com", label: "Email me", icon: Mail, primary: true },
  { href: "https://www.linkedin.com/in/ashmita-nath-2207ba2b5/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://github.com/Ashmita-Nath", label: "GitHub", icon: GithubIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-white/5 overflow-hidden">
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #8B7CFF33, transparent 65%)" }}
        aria-hidden
      />
      <div className="relative mx-auto w-[min(760px,92vw)] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-ink leading-tight"
        >
          Have a problem worth building?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted mt-5 text-lg"
        >
          Whether it involves software, data, AI or product experience, I'd love to connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {buttons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target={b.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                b.primary ? "" : "border border-white/15"
              }`}
              style={b.primary ? { backgroundColor: "var(--color-ink)", color: "var(--color-bg)" } : { color: "var(--color-ink)" }}
            >
              <b.icon size={16} /> {b.label} {!b.primary && <ArrowUpRight size={14} />}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
