import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useGitHubProjects, type UseGitHubProjectsResult } from "../hooks/useGitHubProjects";
import type { Project, Category } from "../data/projects";
import { featuredIds } from "../data/projects";

interface ProjectsContextType extends UseGitHubProjectsResult {
  getProjectsByCategory: (category: Category) => Project[];
  featuredProjects: Project[];
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const result = useGitHubProjects();

  const getProjectsByCategory = (category: Category) => {
    return result.projects.filter((p) => p.category === category);
  };

  const featuredProjects = useMemo(() => {
    // Collect static featured projects by id or explicit featured boolean flag
    const explicitFeatured = result.projects.filter((p) => p.featured);
    const byId = featuredIds
      .map((id) => result.projects.find((p) => p.id === id))
      .filter(Boolean) as Project[];

    const combinedMap = new Map<string, Project>();
    [...byId, ...explicitFeatured].forEach((p) => combinedMap.set(p.id, p));
    return Array.from(combinedMap.values());
  }, [result.projects]);

  const value = useMemo(
    () => ({
      ...result,
      getProjectsByCategory,
      featuredProjects,
    }),
    [result, featuredProjects]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects(): ProjectsContextType {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return ctx;
}
