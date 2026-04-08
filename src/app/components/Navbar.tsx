const links = [
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#stack", label: "Stack" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

export function Navbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-5 md:py-6 w-full relative z-10">
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
          className="font-bold text-[20px] md:text-[22px] tracking-wide mt-0.5"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          utopia
        </span>
      </a>

      <nav
        className="flex items-center gap-5 md:gap-8 text-[13px] md:text-sm text-zinc-400 font-medium tracking-wide"
        aria-label="Navegação principal"
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
