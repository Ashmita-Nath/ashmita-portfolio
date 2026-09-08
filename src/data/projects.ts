export type Category = "sde" | "data" | "ai" | "ux";

export interface ProjectLink {
  github?: string;
  live?: string; // live deployed application URL
  status?: string; // shown when there is no public repo yet
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  featured?: boolean;
  tagline: string;
  description: string;
  tech: string[];
  pipeline?: string[]; // for architecture / flow visuals
  metrics?: { label: string; value: string; note?: string }[];
  learned?: string;
  links: ProjectLink;
  badges?: string[];
  coverImage?: string;
  screenshots?: string[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isDynamic?: boolean;
}

export const projects: Project[] = [
  {
    id: "smartroute",
    title: "SmartRoute",
    category: "sde",
    featured: true,
    tagline: "Intelligent delivery & order management backend",
    description:
      "A backend system for a delivery operation: order lifecycle, delivery-agent assignment, and shortest-path route optimization, built API-first with a cache layer for hot reads.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Dijkstra's Algorithm", "SQLModel"],
    pipeline: ["Client", "FastAPI", "PostgreSQL", "Redis", "Routing Engine", "Delivery Agent"],
    learned:
      "Designing REST APIs around a real operational workflow, implementing Dijkstra's algorithm from scratch for route optimization, and using Redis to cache hot lookups.",
    links: { status: "In development" },
  },
  {
    id: "cpu-cache-simulator",
    title: "CPU Cache & Memory Hierarchy Simulator",
    category: "sde",
    tagline: "Configurable cache simulator modeling CPU → L1 → L2 → memory",
    description:
      "A C++ simulator of a multi-level cache hierarchy: configurable cache size, block size and associativity, direct-mapped / fully-associative / set-associative placement, LRU replacement, and an AMAT + hit-rate statistics engine.",
    tech: ["C++17", "CMake"],
    pipeline: ["CPU", "L1 Cache", "L2 Cache", "Main Memory"],
    learned:
      "Computer-architecture fundamentals — cache mapping strategies, replacement policies, and how to measure and reason about memory performance quantitatively.",
    links: { github: "https://github.com/Ashmita-Nath/CPU-Cache-Memory-Hierarchy-Simulator" },
  },
  {
    id: "school-management-system",
    title: "School Management System",
    category: "sde",
    tagline: "Web portal for student records and academic data",
    description:
      "A web-based school management portal handling student records and academic data, with CRUD flows backed by a relational database.",
    tech: ["Python", "Django", "SQLite"],
    coverImage: "/screenshots/school-management/dashboard.png",
    screenshots: ["/screenshots/school-management/dashboard.png"],
    links: { github: "https://github.com/Ashmita-Nath/School-Management-System" },
  },
  {
    id: "smartcart",
    title: "SmartCart",
    category: "data",
    tagline: "Unsupervised customer segmentation for e-commerce",
    description:
      "Segmented 2,208 e-commerce customer records into four behavioral groups — Premium Spenders, Loyal High-Value, Budget Browsers, and At-Risk Families — using RFM-style feature engineering and unsupervised learning.",
    tech: ["Python", "Scikit-learn", "K-Means", "PCA", "Pandas"],
    pipeline: ["Raw transactions", "RFM features", "PCA (69.3% variance)", "K-Means", "4 segments"],
    metrics: [
      { label: "Customer records", value: "2,208" },
      { label: "Segments found", value: "4" },
      { label: "Silhouette score", value: "0.29" },
      { label: "PCA variance retained", value: "69.3%" },
    ],
    learned:
      "Turning raw transaction data into RFM features, validating cluster count with the elbow method and silhouette score, and translating clusters into retention strategy.",
    links: { status: "In development" },
  },
  {
    id: "stock-recommender",
    title: "Indian Stock Recommendation System",
    category: "ai",
    featured: true,
    tagline: "Buy / Hold / Sell classifier for NSE equities",
    description:
      "A multi-indicator fusion model for classifying Indian equities into Buy, Hold, or Sell, engineered around 19 technical indicators and tuned with Optuna. The methodology is written up in a research paper accepted at ICECA 2026.",
    tech: ["Python", "XGBoost", "Optuna", "SMOTE", "FastAPI", "Technical Indicators"],
    pipeline: ["NSE data", "19 technical indicators", "Feature engineering", "XGBoost", "Buy / Hold / Sell"],
    metrics: [
      { label: "Classification accuracy", value: "98.48%", note: "Reported result on the labeled evaluation dataset — not a guarantee of live market performance." },
      { label: "Technical indicators", value: "19" },
    ],
    badges: ["Research · ICECA 2026"],
    coverImage: "/screenshots/stock-recommender/plot6_radar_best_vs_worst.png",
    screenshots: [
      "/screenshots/stock-recommender/plot6_radar_best_vs_worst.png",
      "/screenshots/stock-recommender/plot3_per_class_f1.png",
    ],
    learned:
      "Avoiding data leakage with a time-aware train/test split, correcting class imbalance with SMOTE after splitting, and tuning hyperparameters with Optuna.",
    links: { github: "https://github.com/Ashmita-Nath/Indian-Stocks-Recommendation" },
  },
  {
    id: "career-guidance",
    title: "AI Career Guidance Platform",
    category: "ai",
    featured: true,
    tagline: "ML career prediction & personalized roadmaps",
    description:
      "An end-to-end deployed Machine Learning application predicting best-fit career tracks from 20 evaluated skills with 90%+ accuracy, interactive career roadmaps, and resume evaluation.",
    tech: ["Python", "Scikit-learn (Random Forest)", "Streamlit", "Pandas", "Matplotlib"],
    pipeline: ["Skill ratings", "Feature extraction", "Random Forest (200 trees)", "Career prediction", "Roadmap & jobs"],
    coverImage: "/screenshots/career-guidance/ss1.png",
    screenshots: [
      "/screenshots/career-guidance/ss1.png",
      "/screenshots/career-guidance/ss2.png",
      "/screenshots/career-guidance/ss3.png",
      "/screenshots/career-guidance/ss4.png",
      "/screenshots/career-guidance/ss5.png",
      "/screenshots/career-guidance/ss6.png",
      "/screenshots/career-guidance/ss7.png",
      "/screenshots/career-guidance/ss8.png",
    ],
    metrics: [
      { label: "Model accuracy", value: "90%+" },
      { label: "Career tracks", value: "8 roles" },
      { label: "Input features", value: "20 skills" },
      { label: "Validation", value: "5-fold Stratified CV" },
    ],
    badges: ["🚀 Live Deployed"],
    learned:
      "Building a complete ML deployment pipeline: training Random Forest classifiers with 5-fold cross validation, handling live inference via Streamlit, and generating structured exportable output.",
    links: {
      github: "https://github.com/Ashmita-Nath/career-guidance-system",
      live: "https://ashmita-nath-career-guidance-system-app-un1uib.streamlit.app/",
    },
  },
  {
    id: "astroventure",
    title: "AstroVenture",
    category: "ux",
    featured: true,
    tagline: "Multi-page cosmic space-exploration web experience",
    description:
      "A cinematic, interactive multi-page web platform exploring planets, galaxies, stellar bodies, and the solar system — complete with atmospheric animations and rich interactive storytelling.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Netlify"],
    coverImage: "/screenshots/astroventure/home.png",
    screenshots: [
      "/screenshots/astroventure/home.png",
      "/screenshots/astroventure/p1.png",
      "/screenshots/astroventure/star1.png",
      "/screenshots/astroventure/g1.png",
    ],
    badges: ["🚀 Live Deployed"],
    learned: "Structuring multi-page narrative architectures, custom CSS keyframe space animations, and deploying seamless client experiences on Netlify.",
    links: {
      github: "https://github.com/Ashmita-Nath/AstroVenture-",
      live: "https://unrivaled-daffodil-4cc1c2.netlify.app/",
    },
  },
  {
    id: "client-portfolio",
    title: "Client Web Portfolio",
    category: "ux",
    tagline: "Responsive business showcase for Editkaro.in agency",
    description:
      "A high-converting client showcase site built for Editkaro.in video agency: featuring interactive service packages, embedded video showreels, client testimonials, and quote acquisition workflow.",
    tech: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"],
    coverImage: "/screenshots/client-portfolio/hero_overview.png",
    screenshots: [
      "/screenshots/client-portfolio/hero_overview.png",
      "/screenshots/client-portfolio/portfolio_showcase.png",
      "/screenshots/client-portfolio/about_section.png",
      "/screenshots/client-portfolio/contact_section.png",
    ],
    badges: ["Client Delivery"],
    learned: "Designing to client brand constraints, implementing sticky dynamic navigation, optimizing video embeds, and managing customer acquisition funnels.",
    links: { github: "https://github.com/Ashmita-Nath/Client-Web-Portfolio" },
  },
  {
    id: "recipe-cards",
    title: "Recipe Cards",
    category: "ux",
    tagline: "Interactive culinary recipe UI module with responsive cards",
    description: "A responsive, modern UI component module presenting recipes with dynamic card layouts, ingredient tags, cooking times, and clean micro-interactions.",
    tech: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    coverImage: "/screenshots/recipe-cards/recipe_card_desktop.png",
    screenshots: [
      "/screenshots/recipe-cards/recipe_card_desktop.png",
      "/screenshots/recipe-cards/recipe_card_mobile.png",
      "/screenshots/recipe-cards/ss1.png",
      "/screenshots/recipe-cards/ss2.png",
    ],
    badges: ["🚀 Live Deployed"],
    learned: "Mobile-first responsive card layouts, CSS grid auto-fill, accessibility, and Netlify continuous deployment.",
    links: {
      github: "https://github.com/Ashmita-Nath/Recipe-Cards",
      live: "https://venerable-banoffee-97aa8a.netlify.app/recipieCard.html",
    },
  },
];

export const featuredIds = ["smartroute", "stock-recommender", "career-guidance", "astroventure"];

export const categoryMeta: Record<Category, { label: string; title: string; subtitle: string }> = {
  sde: {
    label: "Software Engineering",
    title: "Software Engineering",
    subtitle: "Systems, applications and backend infrastructure built to solve real problems.",
  },
  data: {
    label: "Data & Analytics",
    title: "Data & Analytics",
    subtitle: "Turning raw data into patterns, insights and decisions.",
  },
  ai: {
    label: "AI & Machine Learning",
    title: "AI & Machine Learning",
    subtitle: "Machine learning systems built around prediction, recommendation and intelligent decision-making.",
  },
  ux: {
    label: "Product, UI/UX & Frontend",
    title: "Product, UI/UX & Frontend",
    subtitle: "Frontend and product-facing work — from layout hierarchy to interactive experience.",
  },
};
