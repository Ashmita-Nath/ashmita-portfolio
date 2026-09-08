import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function FlowDiagram({
  steps,
  accent = "var(--color-accent)",
}: {
  steps: string[];
  accent?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-xs md:text-[13px] px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap"
            style={{ borderColor: `${accent}55`, color: "var(--color-ink)", background: `${accent}14` }}
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <ChevronRight size={14} className="text-muted shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
