// src/app/components/ui/cinematic-hero.tsx
"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import { whatsappHref } from "../../lib/whatsapp";
import { WA_MSG_HERO } from "../../lib/whatsapp-messages";
import { useIsNarrowMobile } from "../../lib/use-media-query";
import { usePrefersReducedMotion } from "../../lib/motion-pref";
import { cn } from "./utils";

const PlasmaLazy = lazy(() => import("./plasma"));
const Hero3DLazy = lazy(() =>
  import("./Hero3DScene").then((m) => ({ default: m.Hero3DScene })),
);

const DESKTOP_HERO_FALLBACK =
  "absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_38%,#3f3f46_0%,#18181b_45%,#09090b_78%,#000_100%)]";

function HeroHUD() {
  return (
    <>
      {/* Crosshair esquerdo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-5 top-1/2 z-[3] -translate-y-1/2 text-white/60"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="14" cy="14" r="3" />
          <path d="M14 0v8M14 20v8M0 14h8M20 14h28" />
        </svg>
      </div>
      {/* Labels técnicos */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 z-[3] hidden gap-4 text-[10px] tracking-[0.22em] text-white/40 md:flex"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        <span>UTOPIA/</span>
        <span>NODE-01</span>
        <span>R30</span>
      </div>
    </>
  );
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  /** Parágrafo opcional entre o título e o CTA */
  ctaDescription?: string;
  /** Rótulo do botão primário (máx. 5 palavras, ver `content-guidelines.md`) */
  primaryCtaLabel?: string;
  /** Microcopy opcional abaixo do CTA (processo / confiança, sem métricas inventadas) */
  footnote?: string;
}

export function CinematicHero({
  tagline1 = "Criamos sites, landing pages e sistemas que fazem seu negócio crescer.",
  tagline2,
  ctaDescription = "Do design ao desenvolvimento, tudo pensado para gerar resultado.",
  primaryCtaLabel = "Quero meu site profissional",
  footnote = "Resposta rápida no WhatsApp · proposta com valor e prazo",
  className,
  ...props
}: CinematicHeroProps) {
  const narrowMobile = useIsNarrowMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [desktopPlasmaReady, setDesktopPlasmaReady] = useState(false);
  const subcopy = ctaDescription?.trim();
  const tagline2Trim = tagline2?.trim();
  const hasBelowH1 = Boolean(subcopy) || Boolean(tagline2Trim);

  useEffect(() => {
    if (narrowMobile) return;
    const run = () => setDesktopPlasmaReady(true);
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(run, { timeout: 900 });
      return () => cancelIdleCallback(id);
    }
    const t = window.setTimeout(run, 120);
    return () => window.clearTimeout(t);
  }, [narrowMobile]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white antialiased",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        {narrowMobile ? (
          <div aria-hidden className={cn("absolute inset-0", DESKTOP_HERO_FALLBACK)} />
        ) : (
          <>
            <div aria-hidden className={cn("absolute inset-0", DESKTOP_HERO_FALLBACK)} />
            {desktopPlasmaReady && (
              <Suspense fallback={null}>
                {/* Plasma como atmosfera distante */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-80">
                  <PlasmaLazy
                    color="#3f3f46"
                    speed={0.45}
                    direction="forward"
                    scale={1.3}
                    opacity={0.55}
                    mouseInteractive={false}
                  />
                </div>
                {/* Objeto 3D (núcleo) no centro */}
                <div className="absolute inset-0 z-[1] flex items-center justify-center">
                  <div className="h-[70vh] w-[70vh] max-h-[720px] max-w-[720px]">
                    <Hero3DLazy />
                  </div>
                </div>
              </Suspense>
            )}
          </>
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/30 to-black/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-transparent to-black/50"
      />
      {/* HUD técnico inspirado em KPR */}
      <HeroHUD />
      {/* Scroll indicator */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 z-[3] flex items-center gap-2 text-[10px] tracking-[0.22em] text-white/60"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        <span>SCROLL</span>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="8" height="12" rx="4" />
          <line x1="5" y1="3" x2="5" y2="6">
            <animate attributeName="y1" values="3;6;3" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="6;9;6" dur="1.4s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
      <motion.div
        className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 py-20 text-center pointer-events-none md:py-24"
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: 28, x: -18 }
        }
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.72,
          ease: [0.22, 0.65, 0.36, 1],
        }}
      >
        <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Utopia Studio
        </p>
        <h1
          className={cn(
            "text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white",
            hasBelowH1 ? "mb-8" : "mb-10 md:mb-12",
          )}
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="block">{tagline1}</span>
          {tagline2Trim ? (
            <span className="mt-2 block text-zinc-200 sm:mt-3">{tagline2Trim}</span>
          ) : null}
        </h1>
        {subcopy ? (
          <p
            className="mb-12 max-w-2xl text-[1.1rem] font-normal leading-relaxed text-zinc-300 sm:text-[1.2rem] md:text-xl"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {subcopy}
          </p>
        ) : null}
        <div className="flex w-full min-w-0 max-w-md flex-col items-center gap-4 sm:max-w-none">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={whatsappHref(WA_MSG_HERO)}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold leading-none tracking-tight text-black transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              {primaryCtaLabel}
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
          {footnote ? (
            <p
              className="pointer-events-auto max-w-md text-center text-[13px] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:text-xs"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              {footnote}
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
