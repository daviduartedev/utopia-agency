"use client";

import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_NAV } from "../lib/whatsapp-messages";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { cn } from "./ui/utils";

const links = [
  { href: "#ofertas", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#oferta", label: "Oferta" },
  { href: whatsappHref(WA_MSG_NAV), label: "Falar agora" },
] as const;

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

export function Navbar() {
  const narrowMobile = useIsNarrowMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!narrowMobile) setMenuOpen(false);
  }, [narrowMobile]);

  useEffect(() => {
    if (!narrowMobile || !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [narrowMobile, menuOpen, closeMenu]);

  useEffect(() => {
    const onHash = () => closeMenu();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [closeMenu]);

  if (!narrowMobile) {
    return (
      <header className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-page-surface px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3 md:px-6 md:py-3.5">
        <BrandLogo className="shrink-0 self-start sm:self-center" />

        <nav
          className="-mx-1 flex w-full max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-end sm:gap-5 sm:overflow-visible sm:px-0 md:gap-8 [&::-webkit-scrollbar]:hidden"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          aria-label="Navegação principal"
        >
          {links.map(({ href, label }) => {
            const external = /^https?:\/\//i.test(href);
            return (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium tracking-normal text-zinc-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface sm:px-0 sm:py-0 sm:text-sm md:text-[15px]"
              >
                {label}
              </a>
            );
          })}
        </nav>
      </header>
    );
  }

  return (
    <header className="flex w-full flex-col gap-0 rounded-2xl border border-white/10 bg-page-surface px-3 py-2.5">
      <div className="flex w-full min-w-0 items-center justify-between gap-3">
        <BrandLogo className="min-w-0" onClick={closeMenu} />
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuToggleIcon open={menuOpen} />
        </button>
      </div>

      <nav
        id="primary-navigation"
        className={cn(
          "w-full flex-col gap-0.5 border-t border-white/10 pt-3",
          menuOpen ? "flex" : "hidden",
        )}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        aria-label="Navegação principal"
      >
        {links.map(({ href, label }) => {
          const external = /^https?:\/\//i.test(href);
          return (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-[15px] font-medium tracking-normal text-zinc-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
            >
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
