const links = [
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#stack", label: "Stack" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

/** Tipografia e vidro alinhados ao hero (Iridescence + acentos roxos / zinc). */
export function Navbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 w-full rounded-2xl border border-white/15 bg-zinc-950/85 px-4 py-3 md:px-6 md:py-3.5 shadow-[0_12px_48px_rgba(0,0,0,0.65)] backdrop-blur-xl ring-1 ring-inset ring-white/10 supports-[backdrop-filter]:bg-zinc-950/75">
      <a
        href="#inicio"
        className="flex items-center select-none group shrink-0"
        aria-label="Utopia — início"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 group-hover:scale-105 transition-transform duration-300"
          aria-hidden
        >
          <path d="M12 2.5L4.5 7.5L12 12.5L19.5 7.5L12 2.5Z" fill="white" />
          <path
            d="M4.5 11.5L12 16.5L19.5 11.5M4.5 15.5L12 20.5L19.5 15.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="font-bold text-[20px] md:text-[22px] tracking-wide text-white mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          utopia
        </span>
      </a>

      <nav
        className="flex items-center gap-5 md:gap-8 text-sm md:text-[15px] font-medium tracking-tight text-zinc-200"
        style={{ fontFamily: "'Inter', sans-serif" }}
        aria-label="Navegação principal"
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="hover:text-white transition-colors duration-200 whitespace-nowrap [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950/90 rounded-sm"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
