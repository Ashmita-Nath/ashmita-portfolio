export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-[56ch] mb-14">
      {eyebrow && <p className="text-sm mb-3" style={{ color: "var(--color-accent-2)" }}>{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-4xl text-ink">{title}</h2>
      <p className="text-muted mt-3">{subtitle}</p>
    </div>
  );
}
