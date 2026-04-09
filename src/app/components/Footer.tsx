export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="relative z-10 w-full scroll-mt-24 border-t border-white/10 bg-page-surface"
    >
      <div className="mx-auto max-w-[1300px] px-8 py-14 md:px-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span
              className="text-[22px] font-semibold tracking-wide text-white"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            >
              utopia
            </span>
            <p
              className="max-w-sm text-center text-sm leading-relaxed text-zinc-500 md:text-left"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Landings, SaaS e apps — entrega rápida com padrão premium.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-zinc-300"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            aria-label="Rodapé"
          >
            <a href="#inicio" className="transition-colors hover:text-white">
              Início
            </a>
            <a href="#ofertas" className="transition-colors hover:text-white">
              Serviços
            </a>
            <a href="#portfolio" className="transition-colors hover:text-white">
              Trabalhos
            </a>
            <a href="#stack" className="transition-colors hover:text-white">
              Stack
            </a>
            <a href="#depoimentos" className="transition-colors hover:text-white">
              Depoimentos
            </a>
          </nav>
        </div>

        <div
          className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <p className="text-center md:text-left">
            © {currentYear} Utopia Studio. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
