import { BrandLogo } from "./BrandLogo";

const links = [
  { href: "#ofertas", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

export function Navbar() {
  return (
    <header className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-page-surface px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3 md:px-6 md:py-3.5">
      <BrandLogo className="shrink-0 self-start sm:self-center" />

      <nav
        className="-mx-1 flex w-full max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-end sm:gap-5 sm:overflow-visible sm:px-0 md:gap-8 [&::-webkit-scrollbar]:hidden"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        aria-label="Navegação principal"
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium tracking-normal text-zinc-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface sm:px-0 sm:py-0 sm:text-sm md:text-[15px]"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
