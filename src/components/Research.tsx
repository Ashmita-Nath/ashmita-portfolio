import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(167,243,208,0.12)", color: "var(--color-highlight)" }}
            >
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: "var(--color-accent-2)" }}>Research & Recognition</p>
              <h3 className="font-display text-xl text-ink">ICECA 2026</h3>
              <p className="text-sm text-muted mt-2 max-w-[56ch]">
                Research paper accepted for publication and oral presentation, based on the
                Indian Stock Recommendation System — a multi-indicator fusion model using XGBoost
                for Buy / Hold / Sell classification on NSE equities.
              </p>
            </div>
          </div>
          <a
            href="#ai"
            className="shrink-0 text-sm font-medium rounded-lg border border-white/15 px-5 py-2.5 text-ink hover:bg-white/5 transition-colors text-center"
          >
            See the project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
