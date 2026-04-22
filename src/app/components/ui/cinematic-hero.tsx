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

const DESKTOP_HERO_FALLBACK =
  "absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_38%,#3f3f46_0%,#18181b_45%,#09090b_78%,#000_100%)]";

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
  const narrowMobile = useIsNarrowMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [desktopPlasmaReady, setDesktopPlasmaReady] = useState(false);

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
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <PlasmaLazy
                    color="#52525b"
                    speed={0.55}
                    direction="forward"
                    scale={1.05}
                    opacity={0.72}
                    mouseInteractive
                  />
                </div>
              </Suspense>
            )}
          </>
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/30 to-black/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-transparent to-black/50"
      />
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
            href={whatsappHref(WA_MSG_HERO)}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold leading-none tracking-tight text-black transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Quero meu projeto agora
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
      </motion.div>
    </div>
  );
}
