const links = [
  { href: "#ofertas", label: "Serviços" },
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#stack", label: "Stack" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

export function Navbar() {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-page-surface px-4 py-3 md:px-6 md:py-3.5">
      <a
        href="#inicio"
        className="flex shrink-0 select-none items-center"
        aria-label="Utopia — início"
      >
        <span
          className="text-[20px] font-bold tracking-wide text-white md:text-[22px]"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          utopia
        </span>
      </a>

      <nav
        className="flex items-center gap-5 text-sm font-medium tracking-normal text-zinc-300 md:gap-8 md:text-[15px]"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        aria-label="Navegação principal"
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="whitespace-nowrap rounded-sm transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
