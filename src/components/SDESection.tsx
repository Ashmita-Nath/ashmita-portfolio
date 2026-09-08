import { useState } from "react";
import { motion } from "framer-motion";
import { projects as fallbackProjects } from "../data/projects";
import type { Project } from "../data/projects";
import { useProjects } from "../context/ProjectsContext";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import FlowDiagram from "./FlowDiagram";

export default function SDESection() {
  const [open, setOpen] = useState<Project | null>(null);
  const { getProjectsByCategory } = useProjects();
  const items = getProjectsByCategory("sde");
  const smartroute = items.find((p) => p.id === "smartroute") || fallbackProjects.find((p) => p.id === "smartroute")!;
  const cache = items.find((p) => p.id === "cpu-cache-simulator") || fallbackProjects.find((p) => p.id === "cpu-cache-simulator")!;
  const rest = items.filter((p) => p.id !== smartroute.id && p.id !== cache.id);

  return (
    <section id="sde" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeader
          eyebrow="Software Engineering"
          title="Systems that hold up under real workflows"
          subtitle="Backend architecture, REST APIs, and computer-science fundamentals — built and reasoned about from the ground up."
        />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-white/8 p-7 md:p-8"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <h3 className="font-display text-xl text-ink">{smartroute.title}</h3>
            <p className="text-sm text-muted mt-2 max-w-[52ch]">{smartroute.description}</p>
            <div className="mt-6 rounded-xl border border-white/8 p-5" style={{ backgroundColor: "var(--color-surface-2)" }}>
              <FlowDiagram steps={smartroute.pipeline!} accent="var(--color-accent)" />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {smartroute.tech.map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-md text-muted border border-white/10">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setOpen(smartroute)}
              className="mt-6 text-sm text-ink underline decoration-white/20 underline-offset-4 hover:decoration-accent-2"
            >
              Explore project
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/8 p-7 md:p-8 flex flex-col justify-between"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div>
              <h3 className="font-display text-xl text-ink">{cache.title}</h3>
              <p className="text-sm text-muted mt-2">{cache.description}</p>
            </div>
            <div>
              <div className="mt-6 flex flex-col gap-2">
                {cache.pipeline!.map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className="text-xs px-3 py-1.5 rounded-lg border font-medium w-full text-center"
                      style={{ borderColor: "rgba(84,214,199,0.35)", background: "rgba(84,214,199,0.08)" }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setOpen(cache)}
                className="mt-6 text-sm text-ink underline decoration-white/20 underline-offset-4 hover:decoration-accent-2"
              >
                Explore project
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
