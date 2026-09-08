import { useState } from "react";
import { useProjects } from "../context/ProjectsContext";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "../data/projects";

export default function FeaturedProjects() {
  const [open, setOpen] = useState<Project | null>(null);
  const { featuredProjects } = useProjects();

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[52ch] mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-ink">Selected work</h2>
          <p className="text-muted mt-3">
            A curated set of projects spanning backend systems, applied ML, and
            frontend product work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpen} large={i === 0} />
          ))}
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
