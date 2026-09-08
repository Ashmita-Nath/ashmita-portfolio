import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";
import FlowDiagram from "./FlowDiagram";

export default function ProjectCard({
  project,
  onOpen,
  large = false,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  large?: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 md:p-7 hover:border-accent-2/40 transition-all shadow-xl overflow-hidden ${
        large ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(400px circle at var(--x,50%) var(--y,0%), rgba(139,124,255,0.12), transparent 60%)",
        }}
        aria-hidden
      />

      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg md:text-xl text-ink font-semibold">{project.title}</h3>
            <p className="text-sm text-accent-2 mt-1 font-medium" style={{ color: "var(--color-accent-2)" }}>
              {project.tagline}
            </p>
          </div>
          <button
            onClick={() => onOpen(project)}
            aria-label={`Open details for ${project.title}`}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-white/5 transition-colors"
          >
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-2"
            />
          </button>
        </div>

        {project.badges && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.badges.map((b) => (
              <span
                key={b}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Project Thumbnail Screenshot if available */}
        {project.coverImage && (
          <div
            onClick={() => onOpen(project)}
            className="relative mt-4 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] cursor-pointer group/thumb bg-black/30"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/thumb:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-black/70 text-white backdrop-blur-sm border border-white/10">
                View Screenshots & Details
              </span>
            </div>
          </div>
        )}

        <p className="text-sm text-muted/90 mt-4 leading-relaxed">{project.description}</p>

        {large && project.pipeline && (
          <div className="mt-5">
            <FlowDiagram steps={project.pipeline} />
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mt-6">
          {project.tech.slice(0, large ? 8 : 5).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded-md text-muted border border-white/10 bg-white/[0.02] group-hover:border-white/20 group-hover:text-ink transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() => onOpen(project)}
            className="text-xs font-medium text-ink underline decoration-white/20 underline-offset-4 hover:decoration-accent-2 transition-colors"
          >
            Explore project
          </button>

          <div className="flex items-center gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}

            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <GithubIcon size={14} /> Code
                {typeof project.stars === "number" && project.stars > 0 && (
                  <span className="text-[10px] text-amber-300 font-medium ml-0.5">★ {project.stars}</span>
                )}
              </a>
            ) : (
              <span className="text-xs text-muted/70 italic">{project.links.status}</span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
