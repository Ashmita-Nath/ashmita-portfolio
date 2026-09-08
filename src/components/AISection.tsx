import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";
import { useProjects } from "../context/ProjectsContext";
import SectionHeader from "./SectionHeader";
import FlowDiagram from "./FlowDiagram";
import ProjectModal from "./ProjectModal";
import { GithubIcon } from "./BrandIcons";

export default function AISection() {
  const [open, setOpen] = useState<Project | null>(null);
  const { getProjectsByCategory } = useProjects();
  const items = getProjectsByCategory("ai");

  return (
    <section id="ai" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeader
          eyebrow="AI & Machine Learning"
          title="Prediction, recommendation, decision-making"
          subtitle="Feature engineering and model pipelines built with attention to leakage, imbalance, and honest evaluation."
        />

        <div className="flex flex-col gap-5">
          {items.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl border border-white/8 p-7 md:p-8"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-xl text-ink font-semibold">{p.title}</h3>
                    {p.badges?.map((b) => (
                      <span
                        key={b}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted mt-2 max-w-[60ch] leading-relaxed">{p.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all shadow-sm"
                    >
                      <span>Live Streamlit App</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {p.links.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <GithubIcon size={15} /> Code
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Screenshot preview if available */}
              {p.coverImage && (
                <div
                  onClick={() => setOpen(p)}
                  className="mt-6 rounded-xl overflow-hidden border border-white/10 aspect-[21/9] bg-black/40 cursor-pointer group/img relative shadow-md"
                >
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-black/80 text-white border border-white/10">
                      View Model Visualizations & Screenshots ({p.screenshots?.length || 1})
                    </span>
                  </div>
                </div>
              )}

              {p.pipeline && (
                <div className="mt-6 rounded-xl border border-white/8 p-5 overflow-x-auto" style={{ backgroundColor: "var(--color-surface-2)" }}>
                  <FlowDiagram steps={p.pipeline} accent="var(--color-highlight)" />
                </div>
              )}

              {p.metrics && (
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-white/10 p-4">
                      <div className="font-display text-lg text-ink">{m.value}</div>
                      <div className="text-xs text-muted mt-0.5">{m.label}</div>
                      {m.note && <div className="text-[11px] text-muted/70 mt-1.5">{m.note}</div>}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-md text-muted border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setOpen(p)}
                  className="text-sm text-ink underline decoration-white/20 underline-offset-4 hover:decoration-accent-2 shrink-0"
                >
                  Explore project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
