import { useState } from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: "software", label: "Software", x: 90, y: 70, color: "#8B7CFF" },
  { id: "data", label: "Data", x: 260, y: 40, color: "#54D6C7" },
  { id: "ai", label: "AI", x: 300, y: 190, color: "#A7F3D0" },
  { id: "design", label: "Design", x: 110, y: 220, color: "#8B7CFF" },
];

const edges: [string, string][] = [
  ["software", "data"],
  ["data", "ai"],
  ["ai", "design"],
  ["design", "software"],
  ["software", "ai"],
];

function find(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export default function NodeVisual() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square">
      <svg viewBox="0 0 380 300" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B7CFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="190" cy="150" r="160" fill="url(#glow)" />

        {edges.map(([a, b], i) => {
          const na = find(a);
          const nb = find(b);
          const isActive = hovered === a || hovered === b;
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={isActive ? "#54D6C7" : "#26303f"}
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-300"
            />
          );
        })}

        {nodes.map((n, i) => (
          <g
            key={n.id}
            transform={`translate(${n.x}, ${n.y})`}
            className="cursor-pointer animate-float-slow"
            style={{ animationDelay: `${i * 0.6}s` }}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            role="img"
            aria-label={n.label}
            onFocus={() => setHovered(n.id)}
            onBlur={() => setHovered(null)}
          >
            <circle
              r={hovered === n.id ? 14 : 10}
              fill={n.color}
              opacity={hovered === n.id ? 1 : 0.75}
              className="transition-all duration-300"
            />
            <circle r={hovered === n.id ? 24 : 0} fill={n.color} opacity={0.15} className="transition-all duration-300" />
          </g>
        ))}
      </svg>

      {nodes.map((n) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered === n.id ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute glass px-3 py-1.5 rounded-lg text-xs font-medium text-ink pointer-events-none"
          style={{
            left: `${(n.x / 380) * 100}%`,
            top: `${(n.y / 300) * 100}%`,
            transform: "translate(-50%, -160%)",
          }}
        >
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}
