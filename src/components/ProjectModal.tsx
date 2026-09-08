import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Reset active image index whenever project changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [project?.id]);

  const screenshots = project?.screenshots ?? (project?.coverImage ? [project.coverImage] : []);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative glass rounded-3xl w-[min(780px,96vw)] max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-white/15 shadow-2xl"
            style={{ backgroundColor: "var(--color-surface-2)" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-ink hover:bg-white/10 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent-2 px-2.5 py-0.5 rounded-full bg-accent-2/10 border border-accent-2/20">
                  {project.category.toUpperCase()}
                </span>
                {project.badges?.map((b) => (
                  <span
                    key={b}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-bold">{project.title}</h3>
              <p className="text-sm sm:text-base text-muted mt-1.5 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Live Demo & Code Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-white/10">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 px-5 py-2.5 text-sm font-semibold transition-all shadow-md"
                >
                  <span>🚀 Launch Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-ink hover:bg-white/10 transition-colors"
                >
                  <GithubIcon size={16} /> View on GitHub
                  {typeof project.stars === "number" && project.stars > 0 && (
                    <span className="text-xs text-amber-300 font-medium ml-1">★ {project.stars}</span>
                  )}
                </a>
              ) : (
                <span className="text-xs text-muted italic px-3 py-2">{project.links.status}</span>
              )}
            </div>

            {/* Screenshots Carousel / Gallery */}
            {screenshots.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-wider">
                    <ImageIcon size={14} className="text-accent-2" />
                    <span>Project Visuals & Screenshots ({activeImageIdx + 1} of {screenshots.length})</span>
                  </div>
                  {screenshots.length > 1 && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))
                        }
                        aria-label="Previous screenshot"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-ink transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIdx((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))
                        }
                        aria-label="Next screenshot"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-ink transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Screen Display */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-[16/10] shadow-inner flex items-center justify-center">
                  <img
                    key={screenshots[activeImageIdx]}
                    src={screenshots[activeImageIdx]}
                    alt={`${project.title} screenshot ${activeImageIdx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thumbnail Strip (if > 1 image) */}
                {screenshots.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {screenshots.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        aria-label={`View screenshot ${idx + 1}`}
                        className={`relative rounded-lg overflow-hidden border shrink-0 w-20 aspect-[16/10] transition-all ${
                          idx === activeImageIdx
                            ? "border-accent-2 ring-2 ring-accent-2/30 scale-105"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={s} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Details & Specs */}
            <div className="mt-7 space-y-6 text-sm">
              <div>
                <h4 className="text-muted uppercase tracking-wider text-xs font-semibold mb-2">Overview & Approach</h4>
                <p className="text-ink/90 leading-relaxed text-sm sm:text-base">{project.description}</p>
              </div>

              <div>
                <h4 className="text-muted uppercase tracking-wider text-xs font-semibold mb-2">Technologies & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-ink/90">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.metrics && (
                <div>
                  <h4 className="text-muted uppercase tracking-wider text-xs font-semibold mb-2">Key Metrics & Validation</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="font-display text-lg font-bold text-accent-2">{m.value}</div>
                        <div className="text-xs text-muted mt-0.5">{m.label}</div>
                        {m.note && <div className="text-[10px] text-muted/70 mt-1">{m.note}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.learned && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h4 className="text-muted uppercase tracking-wider text-xs font-semibold mb-1.5">Key Engineering Learnings</h4>
                  <p className="text-ink/90 leading-relaxed text-xs sm:text-sm">{project.learned}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
