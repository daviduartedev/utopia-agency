// src/app/components/ui/cinematic-hero.tsx
"use client";

import React from "react";
import Plasma from "./plasma";
import { cn } from "./utils";

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "Produto digital",
  tagline2 = "pronto para vender",
  ctaDescription = "Agência focada em landing pages, sistemas SaaS e aplicativos: briefing objetivo, prazos curtos e entrega eficiente — sem abrir mão do acabamento premium.",
  className,
  ...props
}: CinematicHeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white antialiased",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        <Plasma
          color="#52525b"
          speed={0.55}
          direction="forward"
          scale={1.05}
          opacity={0.72}
          mouseInteractive
        />
      </div>
      {/* vignette vertical + lateral para legibilidade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/30 to-black/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-transparent to-black/50"
      />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 py-28 text-center pointer-events-none">
        <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Utopia Studio
        </p>
        <h1
          className="mb-8 text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          <span className="block">{tagline1}</span>
          <span className="block text-zinc-200">{tagline2}</span>
        </h1>
        <p
          className="mb-12 max-w-2xl text-[1.1rem] font-normal leading-relaxed text-zinc-300 sm:text-[1.2rem] md:text-xl"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {ctaDescription}
        </p>
        <div className="flex w-full min-w-0 max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href="#contato"
            className="pointer-events-auto inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold leading-none tracking-tight text-black transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Solicitar proposta
            <svg
              className="h-5 w-5 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
