"use client";

import { useEffect, useState } from "react";

/** Client-only; defaults to false (animate) until hydration. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

type ScrollRevealOpts = {
  /** Stagger index for children (multiplied by ~70ms when motion is allowed). */
  delayIndex?: number;
  /**
   * Entrada alternada da esquerda/direita + leve Y (estilo Framer/Webflow).
   * Índice par → vem da esquerda; ímpar → da direita.
   */
  lateral?: boolean;
};

const STAGGER_MS = 0.07;
const LATERAL_PX = 26;

/**
 * Fade + slide on scroll; with reduced motion → static, one-shot.
 * When allowed, `viewport.once: false` so elements ease back when leaving view (“saída”).
 */
export function scrollRevealMotion(reduced: boolean, opts: ScrollRevealOpts = {}) {
  const { delayIndex = 0, lateral: lateralOpt } = opts;
  const delay = reduced ? 0 : delayIndex * STAGGER_MS;
  const lateral = Boolean(lateralOpt);
  const startX =
    lateral && !reduced ? (delayIndex % 2 === 0 ? -LATERAL_PX : LATERAL_PX) : 0;

  if (reduced) {
    return {
      initial: { opacity: 1, x: 0, y: 0 },
      whileInView: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0 },
      viewport: { once: true, margin: "-64px" as const },
    };
  }

  return {
    initial: { opacity: 0, y: lateral ? 16 : 22, x: startX },
    whileInView: { opacity: 1, y: 0, x: 0 },
    transition: {
      duration: 0.52,
      delay,
      ease: [0.22, 0.65, 0.36, 1] as const,
    },
    viewport: { once: false, amount: 0.2, margin: "-10% 0px -6% 0px" as const },
  };
}
