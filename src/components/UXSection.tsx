import { useState } from "react";
import { motion } from "framer-motion";
import { Circle, ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";
import { useProjects } from "../context/ProjectsContext";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";

const displayUrls: Record<string, string> = {
  astroventure: "unrivaled-daffodil-4cc1c2.netlify.app",
  "recipe-cards": "venerable-banoffee-97aa8a.netlify.app/recipieCard.html",
  "client-portfolio": "editkaro.in · client business portal",
};

function BrowserFrame({ project, onOpen }: { project: Project; onOpen: () => void }) {
  let url = displayUrls[project.id];
  if (!url) {
    if (project.links.live) {
      try {
        url = new URL(project.links.live).hostname;
      } catch {
        url = project.links.live;
      }
    } else {
      url = `${project.id.replace(/^gh-/, "")}.app`;
    }
  }

  return (
    <div
      onClick={onOpen}
      className="group relative rounded-xl overflow-hidden border border-white/10 aspect-[16/10] bg-surface-2 cursor-pointer shadow-lg hover:border-accent-2/40 transition-all duration-300"
      style={{ backgroundColor: "var(--color-surface-2)" }}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/40 border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <Circle size={8} fill="#ef4444" stroke="none" />
          <Circle size={8} fill="#eab308" stroke="none" />
          <Circle size={8} fill="#22c55e" stroke="none" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted max-w-[220px] truncate">
          <Lock size={9} className="text-emerald-400 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        {project.links.live ? (
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            LIVE
          </span>
        ) : (
          <span className="text-[10px] text-muted">SHOWCASE</span>
        )}
      </div>

      {/* Screenshot Image Container */}
      <div className="relative w-full h-[calc(100%-33px)] overflow-hidden bg-black/20">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted">
            Interactive Showcase
          </div>
        )}

        {/* Hover Overlay with Preview prompt */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-lg bg-ink text-bg text-xs font-medium shadow-md">
            Click to View Gallery
          </span>
        </div>
      </div>
    </div>
  );
}

export default function UXSection() {
  const [open, setOpen] = useState<Project | null>(null);
  const { getProjectsByCategory } = useProjects();
  const items = getProjectsByCategory("ux");

  return (
    <section id="ux" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeader
          eyebrow="Product, UI/UX & Frontend"
          title="Frontend & Creative Engineering"
          subtitle="Live interactive web platforms, multi-page space journeys, client agency portals, and modular responsive UI components."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div>
                <BrowserFrame project={p} onOpen={() => setOpen(p)} />
                <div className="flex items-center justify-between gap-2 mt-5">
                  <h3 className="font-display text-lg text-ink font-semibold">{p.title}</h3>
                  {p.badges?.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted mt-2 leading-relaxed">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-md text-muted border border-white/10 bg-white/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setOpen(p)}
                  className="text-xs font-medium text-ink underline decoration-white/30 underline-offset-4 hover:decoration-accent-2 transition-colors"
                >
                  Gallery & Details
                </button>

                <div className="flex items-center gap-2">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} />
                    </a>
                  )}

                  {p.links.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Repository"
                      className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <GithubIcon size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
