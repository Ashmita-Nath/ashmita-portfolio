import { useState } from "react";
import { motion } from "framer-motion";
import { projects as fallbackProjects } from "../data/projects";
import type { Project } from "../data/projects";
import { useProjects } from "../context/ProjectsContext";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function DataSection() {
  const [open, setOpen] = useState<Project | null>(null);
  const { getProjectsByCategory } = useProjects();
  const items = getProjectsByCategory("data");
  const smartcart = items.find((p) => p.id === "smartcart") || fallbackProjects.find((p) => p.id === "smartcart")!;
  const otherData = items.filter((p) => p.id !== smartcart.id);

  return (
    <section id="data" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeader
          eyebrow="Data & Analytics"
          title="Turning raw data into a decision"
          subtitle="Cleaning, feature engineering, and validated analysis — presented the way a data product surfaces an insight."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 overflow-hidden"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="p-7 md:p-9 border-b border-white/8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="font-display text-xl text-ink">{smartcart.title}</h3>
              <span className="text-xs text-muted italic">{smartcart.links.status}</span>
            </div>
            <p className="text-sm text-muted mt-2 max-w-[60ch]">{smartcart.description}</p>

            <div className="mt-6 grid grid-cols-4 gap-3 text-center text-xs text-muted">
              {["Question", "Data", "Analysis", "Insight"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 justify-center">
                  <span className="hidden sm:inline">{i > 0 ? "→" : ""}</span>
                  <span className="text-ink font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {smartcart.metrics && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
              {smartcart.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <div className="font-display text-2xl md:text-3xl" style={{ color: "var(--color-accent-2)" }}>
                    {m.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{m.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="p-7 md:p-9 flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-1.5">
              {smartcart.tech.map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-md text-muted border border-white/10">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setOpen(smartcart)}
              className="text-sm text-ink underline decoration-white/20 underline-offset-4 hover:decoration-accent-2"
            >
              Explore project
            </button>
          </div>
        </motion.div>

        {/* Additional dynamically fetched data projects */}
        {otherData.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {otherData.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setOpen} />
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
