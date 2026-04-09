// src/app/components/ui/cinematic-hero.tsx
"use client";

import React from "react";
import { cn } from "./utils";

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "Produto digital",
  tagline2 = "pronto para vender.",
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
      <div className="flex w-full max-w-4xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-500">
          Utopia Studio
        </p>
        <h1
          className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          <span className="block">{tagline1}</span>
          <span className="block text-zinc-100">{tagline2}</span>
        </h1>
        <p
          className="mb-12 max-w-xl text-lg font-normal leading-relaxed text-zinc-400 md:text-xl"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-6 sm:flex-row">
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-semibold leading-none tracking-tight text-black transition-colors hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Solicitar proposta
            <svg
              className="h-5 w-5 text-zinc-600"
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
