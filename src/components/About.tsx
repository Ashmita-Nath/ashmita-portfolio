import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const stack = [
  "Python", "C++", "SQL", "Data Structures & Algorithms", "Machine Learning",
  "FastAPI", "Django", "Streamlit", "PostgreSQL", "Redis", "Git",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)] grid md:grid-cols-[1fr_1fr] gap-14 items-start">
        <div>
          <SectionHeader
            eyebrow="About"
            title="Who is Ashmita?"
            subtitle=""
          />
          <div className="space-y-5 -mt-8 text-[17px] leading-relaxed text-ink/90 max-w-[52ch]">
            <p>
              I'm a Computer Science undergraduate at Dayananda Sagar University
              with a strong interest in software engineering, data, machine
              learning and product development.
            </p>
            <p>
              I like taking a problem from idea through architecture,
              implementation, analysis, and finally the experience someone
              actually uses.
            </p>
            <p className="text-muted">
              Outside of coursework, I was elected Class Representative for two
              years, coordinating between faculty and 60+ students, and led a
              project team as part of a minor project.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 p-7 md:p-8"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <h3 className="font-display text-base text-ink mb-5">Toolkit</h3>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="text-sm px-3.5 py-2 rounded-full border border-white/10 text-ink/85"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted text-xs mb-1">Program</div>
              <div className="text-ink">B.Tech, CSE</div>
            </div>
            <div>
              <div className="text-muted text-xs mb-1">Timeline</div>
              <div className="text-ink">2023 – 2027</div>
            </div>
            <div>
              <div className="text-muted text-xs mb-1">University</div>
              <div className="text-ink">Dayananda Sagar University</div>
            </div>
            <div>
              <div className="text-muted text-xs mb-1">Based in</div>
              <div className="text-ink">Bengaluru, India</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
