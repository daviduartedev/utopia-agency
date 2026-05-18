"use client";

import { ArrowRight, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_NAV } from "../lib/whatsapp-messages";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { usePrefersReducedMotion } from "../lib/motion-pref";
import { cn } from "./ui/utils";

const navLinks = [
  { href: "#ofertas", label: "Servi\u00e7os" },
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "FAQ" },
] as const;

const CTA_HREF = whatsappHref(WA_MSG_NAV);

export function Navbar() {
  const narrowMobile = useIsNarrowMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!narrowMobile) setMenuOpen(false);
  }, [narrowMobile]);

  const motionProps = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: [0.22, 0.65, 0.36, 1] as const,
    },
  };

  return (
    <motion.header
      {...motionProps}
      className="mx-auto flex w-full max-w-[920px] flex-col rounded-[22px] border border-black/8 bg-white/55 px-2.5 py-2 shadow-[0_18px_60px_rgba(24,24,24,0.1)] backdrop-blur-2xl"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <BrandLogo
          className="min-w-0 gap-2 rounded-full px-1"
          imgClassName="size-7 md:size-8"
          wordmarkClassName="text-black text-[15px] md:text-[16px]"
          onClick={() => setMenuOpen(false)}
        />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navega\u00e7\u00e3o principal">
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-3 py-2 text-[12px] font-bold text-black/54 transition hover:bg-black/5 hover:text-black"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-2 text-[11px] font-bold text-black/60">
            <span className="size-1.5 rounded-full bg-[var(--utopia-green)] shadow-[0_0_14px_var(--utopia-green)]" />
            3 slots abertos
          </span>
          <a
            href="https://www.instagram.com/utopia_digital.lab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-9 items-center justify-center rounded-full bg-white/65 text-black/65 transition hover:bg-black hover:text-white"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="inline-flex size-9 items-center justify-center rounded-full bg-black text-white transition hover:-translate-y-0.5"
          >
            <MessageCircle className="size-4" />
          </a>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-2 text-[12px] font-bold text-white"
          >
            Quero
            <ArrowRight className="size-3.5" />
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full bg-white/70 text-black"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <nav
        className={cn(
          "mt-2 grid gap-1 border-t border-black/8 pt-2 sm:hidden",
          menuOpen ? "grid" : "hidden",
        )}
        aria-label="Navega\u00e7\u00e3o mobile"
      >
        {navLinks.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="rounded-2xl px-3 py-3 text-[14px] font-bold text-black/65 hover:bg-black/5 hover:text-black"
          >
            {label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
