import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const groups = [
  {
    name: "Software Engineering",
    color: "var(--color-accent)",
    skills: ["Python", "C++", "Data Structures & Algorithms", "OOP", "FastAPI", "Django", "REST APIs", "PostgreSQL", "Redis", "Git"],
  },
  {
    name: "Data Analytics",
    color: "var(--color-accent-2)",
    skills: ["Pandas", "NumPy", "SQL", "Data Cleaning", "EDA", "Visualization"],
  },
  {
    name: "AI / ML",
    color: "var(--color-highlight)",
    skills: ["Scikit-learn", "XGBoost", "Optuna", "K-Means", "PCA", "Feature Engineering", "Model Evaluation"],
  },
  {
    name: "Frontend",
    color: "var(--color-accent)",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Streamlit"],
  },
];

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeader
          eyebrow="Skills"
          title="What I reach for"
          subtitle="Grouped by the kind of problem, not just the label — hover to focus a group."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="font-display text-base text-ink mb-4">{g.name}</h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => {
                  const dimmed = hovered && hovered !== g.name;
                  return (
                    <motion.span
                      key={s}
                      onMouseEnter={() => setHovered(g.name)}
                      onMouseLeave={() => setHovered(null)}
                      animate={{ opacity: dimmed ? 0.35 : 1 }}
                      className="text-sm px-3.5 py-2 rounded-full border cursor-default select-none"
                      style={{
                        borderColor: hovered === g.name ? `${g.color}88` : "rgba(255,255,255,0.1)",
                        background: hovered === g.name ? `${g.color}14` : "transparent",
                        color: "var(--color-ink)",
                      }}
                    >
                      {s}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
