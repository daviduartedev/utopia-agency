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
};

const STAGGER_MS = 0.07;

/**
 * Fade + slide on scroll; with reduced motion → static, one-shot.
 * When allowed, `viewport.once: false` so elements ease back when leaving view (“saída”).
 */
export function scrollRevealMotion(reduced: boolean, opts: ScrollRevealOpts = {}) {
  const { delayIndex = 0 } = opts;
  const delay = reduced ? 0 : delayIndex * STAGGER_MS;

  if (reduced) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
      viewport: { once: true, margin: "-64px" as const },
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.48,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
    viewport: { once: false, amount: 0.22, margin: "-12% 0px -8% 0px" as const },
  };
}
