import { Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const links = [
  { href: "https://github.com/Ashmita-Nath", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/ashmita-nath-2207ba2b5/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://leetcode.com/u/ashmitanath463/", label: "LeetCode", icon: Code2 },
  { href: "mailto:ashmitanath463@gmail.com", label: "Email", icon: Mail },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={l.label}
            title={l.label}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-muted hover:text-ink hover:border-accent-2/50 hover:bg-white/5 transition-colors"
          >
            <l.icon size={17} />
          </a>
        </li>
      ))}
    </ul>
  );
}
