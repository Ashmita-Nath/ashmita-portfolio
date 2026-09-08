import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto w-[min(1180px,92vw)] flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-center md:text-left">
          <div className="font-display text-ink">Ashmita Nath</div>
          <div className="text-sm text-muted mt-1">
            Computer Science · Software · Data · AI · Product
          </div>
        </div>
        <SocialLinks />
        <div className="text-sm text-muted">© 2026 Ashmita Nath</div>
      </div>
    </footer>
  );
}
