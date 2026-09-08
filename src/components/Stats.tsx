import { motion } from "framer-motion";
import { useProjects } from "../context/ProjectsContext";

export default function Stats() {
  const { repoCount } = useProjects();
  const repoValue = repoCount > 0 ? `${repoCount}+` : "11+";

  const stats = [
    { value: "3+", label: "Live Deployed Web Apps", highlight: true },
    { value: "ICECA '26", label: "Accepted Research Paper", highlight: false },
    { value: "98.48%", label: "ML Classification Accuracy", highlight: false },
    { value: repoValue, label: "Open-Source Repositories", highlight: false },
  ];
  return (
    <section className="relative py-12 border-y border-white/5 bg-surface/40" style={{ backgroundColor: "rgba(14, 19, 27, 0.4)" }}>
      <div className="mx-auto w-[min(1180px,92vw)] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-white/10 p-5 bg-white/[0.02] backdrop-blur-sm hover:border-accent-2/30 transition-all group"
          >
            <div className="font-display text-2xl sm:text-3xl font-bold text-ink group-hover:text-accent-2 transition-colors">
              {s.value}
            </div>
            <div className="text-xs sm:text-sm text-muted mt-1.5 font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
