import { useState, useEffect, useCallback } from "react";
import { projects as staticProjects } from "../data/projects";
import type { Project, Category } from "../data/projects";

const GITHUB_USERNAME = "Ashmita-Nath";
const CACHE_KEY = "ashmita_github_projects_cache_v2";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  archived: boolean;
}

export interface UseGitHubProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  isLive: boolean;
  lastSynced: Date | null;
  repoCount: number;
  refresh: () => Promise<void>;
}

// Map common acronyms and formatting in repo names
function formatRepoTitle(name: string): string {
  // Strip trailing dashes (like AstroVenture-)
  const clean = name.replace(/-+$/, "");
  return clean
    .split(/[-_]+/)
    .map((word) => {
      const upper = word.toUpperCase();
      if (["CI", "CD", "AI", "ML", "API", "CPU", "UI", "UX", "REST", "SQL", "LRU", "NSE", "RFM", "PCA"].includes(upper)) {
        return upper;
      }
      if (upper === "CICD") return "CI/CD";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Determine the category based on topics, language, and keywords
function detectCategory(repo: GitHubRepo): Category {
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  const desc = (repo.description || "").toLowerCase();
  const name = repo.name.toLowerCase();
  const lang = (repo.language || "").toLowerCase();

  // 1. Explicit topic overrides
  if (topics.includes("portfolio-ai")) return "ai";
  if (topics.includes("portfolio-sde")) return "sde";
  if (topics.includes("portfolio-data")) return "data";
  if (topics.includes("portfolio-ux")) return "ux";

  // 2. AI & Machine Learning topic matches
  const aiKeywords = [
    "ai",
    "ml",
    "machine-learning",
    "deep-learning",
    "nlp",
    "llm",
    "neural-network",
    "computer-vision",
    "xgboost",
    "optuna",
    "smote",
    "scikit-learn",
    "pytorch",
    "tensorflow",
  ];
  if (topics.some((t) => aiKeywords.includes(t))) return "ai";

  // 3. Data & Analytics topic matches
  const dataKeywords = [
    "data",
    "data-science",
    "analytics",
    "clustering",
    "k-means",
    "pca",
    "rfm",
    "eda",
    "data-analysis",
    "visualization",
    "tableau",
    "bi",
  ];
  if (topics.some((t) => dataKeywords.includes(t))) return "data";

  // 4. Product / UI / UX topic matches
  const uxKeywords = [
    "ux",
    "ui",
    "frontend",
    "web",
    "web-development",
    "portfolio",
    "landing-page",
    "css",
    "css3",
    "html5",
    "react",
    "vue",
    "svelte",
    "tailwind",
  ];
  if (topics.some((t) => uxKeywords.includes(t))) return "ux";

  // 5. Software Engineering / Backend / DevOps topic matches
  const sdeKeywords = [
    "sde",
    "backend",
    "devops",
    "ci-cd",
    "docker",
    "kubernetes",
    "jenkins",
    "fastapi",
    "django",
    "flask",
    "postgresql",
    "redis",
    "sqlite",
    "c++",
    "cpp",
    "systems",
    "microservices",
    "system-design",
  ];
  if (topics.some((t) => sdeKeywords.includes(t))) return "sde";

  // 6. Keyword matching in description or name
  if (
    desc.includes("machine learning") ||
    desc.includes("deep learning") ||
    desc.includes("recommendation") ||
    desc.includes("predict") ||
    desc.includes("xgboost") ||
    name.includes("recommender")
  ) {
    return "ai";
  }

  if (
    desc.includes("customer segmentation") ||
    desc.includes("clustering") ||
    desc.includes("analytics") ||
    desc.includes("rfm")
  ) {
    return "data";
  }

  if (
    desc.includes("portfolio") ||
    desc.includes("ui/ux") ||
    desc.includes("recipe card") ||
    desc.includes("cosmic") ||
    desc.includes("space-exploration")
  ) {
    return "ux";
  }

  if (
    desc.includes("devops") ||
    desc.includes("pipeline") ||
    desc.includes("jenkins") ||
    desc.includes("docker") ||
    desc.includes("backend") ||
    desc.includes("simulator") ||
    desc.includes("fastapi") ||
    desc.includes("django") ||
    desc.includes("cache")
  ) {
    return "sde";
  }

  // 7. Language fallback
  if (["c++", "c", "rust", "go", "java"].includes(lang)) return "sde";
  if (["html", "css", "typescript", "javascript"].includes(lang)) return "ux";
  if (lang === "jupyter notebook") return "ai";

  return "sde";
}

// Extract clean technology tags from repo
function extractTech(repo: GitHubRepo): string[] {
  const techSet = new Set<string>();

  if (repo.language) {
    techSet.add(repo.language);
  }

  // Add meaningful topics
  const ignoreTopics = new Set([
    "portfolio",
    "portfolio-ai",
    "portfolio-sde",
    "portfolio-data",
    "portfolio-ux",
    "portfolio-hide",
    "portfolio-featured",
    "featured",
  ]);

  (repo.topics || []).forEach((topic) => {
    if (!ignoreTopics.has(topic.toLowerCase())) {
      const clean = formatRepoTitle(topic);
      techSet.add(clean);
    }
  });

  return Array.from(techSet).slice(0, 6);
}

// Match static project to GitHub repo by URL or name
function matchStaticProject(staticProj: Project, repos: GitHubRepo[]): GitHubRepo | undefined {
  const staticGithub = staticProj.links.github?.toLowerCase() || "";
  return repos.find((repo) => {
    const repoUrl = repo.html_url.toLowerCase();
    const repoName = repo.name.toLowerCase().replace(/[-_]/g, "");
    const projId = staticProj.id.toLowerCase().replace(/[-_]/g, "");

    // Check full URL match
    if (staticGithub && repoUrl === staticGithub) return true;

    // Check if repo name is substring or match of project id
    if (repoName.includes(projId) || projId.includes(repoName)) return true;

    return false;
  });
}

export function useGitHubProjects(): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [repoCount, setRepoCount] = useState<number>(staticProjects.length);

  const processRepos = useCallback((repos: GitHubRepo[]) => {
    // Filter out profile README repository and hidden repos
    const validRepos = repos.filter(
      (r) =>
        r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() &&
        !r.topics.includes("portfolio-hide") &&
        !r.topics.includes("hide")
    );

    setRepoCount(validRepos.length);

    // Track which repos matched static projects
    const matchedRepoIds = new Set<number>();

    // 1. Enrich existing curated static projects with live stars, updates, and links
    const enrichedStatic: Project[] = staticProjects.map((proj) => {
      const matchedRepo = matchStaticProject(proj, validRepos);
      if (matchedRepo) {
        matchedRepoIds.add(matchedRepo.id);
        return {
          ...proj,
          stars: matchedRepo.stargazers_count,
          forks: matchedRepo.forks_count,
          updatedAt: matchedRepo.updated_at,
          links: {
            ...proj.links,
            github: matchedRepo.html_url,
            live: proj.links.live || matchedRepo.homepage || undefined,
          },
        };
      }
      return proj;
    });

    // 2. Discover brand new repos that are NOT already in static projects
    const newRepos = validRepos.filter((r) => !matchedRepoIds.has(r.id));
    const dynamicProjects: Project[] = newRepos.map((repo) => {
      const category = detectCategory(repo);
      const isFeatured =
        repo.topics.includes("featured") || repo.topics.includes("portfolio-featured");

      const badges: string[] = ["⚡ Live GitHub"];
      if (repo.stargazers_count > 0) {
        badges.push(`⭐ ${repo.stargazers_count}`);
      }

      return {
        id: `gh-${repo.id}`,
        title: formatRepoTitle(repo.name),
        category,
        featured: isFeatured,
        tagline: repo.description
          ? repo.description.length > 75
            ? repo.description.slice(0, 72) + "..."
            : repo.description
          : "Open-source repository on GitHub",
        description:
          repo.description ||
          `Open source software repository developed by Ashmita Nath using ${repo.language || "modern technologies"}.`,
        tech: extractTech(repo),
        links: {
          github: repo.html_url,
          live: repo.homepage || undefined,
        },
        badges,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        isDynamic: true,
      };
    });

    // Combine static curated projects + any new dynamic projects
    setProjects([...enrichedStatic, ...dynamicProjects]);
    setIsLive(true);
  }, []);

  const fetchRepos = useCallback(
    async (force: boolean = false) => {
      setLoading(true);
      setError(null);

      // Check cache first if not forced
      if (!force) {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.repos)) {
              processRepos(parsed.repos);
              setLastSynced(new Date(parsed.timestamp));
              setLoading(false);
              return;
            }
          }
        } catch {
          // localStorage disabled or corrupted, proceed to fetch
        }
      }

      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit reached. Showing cached portfolio.");
          }
          throw new Error(`GitHub API returned status ${res.status}`);
        }

        const data: GitHubRepo[] = await res.json();
        const now = Date.now();

        // Save to cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: now,
              repos: data,
            })
          );
        } catch {
          // Ignore cache quota errors
        }

        processRepos(data);
        setLastSynced(new Date(now));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to fetch from GitHub";
        setError(msg);
        // Resilient fallback: ensure static projects remain visible
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    },
    [processRepos]
  );

  useEffect(() => {
    fetchRepos(false);
  }, [fetchRepos]);

  const refresh = useCallback(async () => {
    await fetchRepos(true);
  }, [fetchRepos]);

  return {
    projects,
    loading,
    error,
    isLive,
    lastSynced,
    repoCount,
    refresh,
  };
}
