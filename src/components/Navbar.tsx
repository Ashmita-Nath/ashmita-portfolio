import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LiveSyncIndicator from "./LiveSyncIndicator";

const links = [
  { href: "#work", label: "Work" },
  { href: "#sde", label: "SDE" },
  { href: "#data", label: "Data" },
  { href: "#ai", label: "AI/ML" },
  { href: "#ux", label: "UI/UX" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        className={`glass flex items-center justify-between gap-4 md:gap-6 rounded-2xl px-5 py-3 w-[min(1100px,92vw)] transition-shadow ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="font-display text-sm tracking-wide text-ink font-medium">
          Ashmita Nath
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative px-3 py-1.5 rounded-lg transition-colors hover:text-ink ${
                  active === l.href ? "text-ink" : ""
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LiveSyncIndicator compact />

          <div className="hidden md:block">
            <a
              href="/Ashmita-Nath-Resume.pdf"
              className="text-sm font-medium rounded-lg border border-accent/40 px-4 py-2 text-ink hover:bg-accent/10 transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-ink p-1 rounded-lg hover:bg-white/5"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass md:hidden fixed top-20 rounded-2xl p-4 w-[88vw] flex flex-col gap-1 text-sm"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-muted hover:text-ink hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Ashmita-Nath-Resume.pdf"
              className="mt-2 px-3 py-2.5 rounded-lg border border-accent/40 text-center text-ink"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
