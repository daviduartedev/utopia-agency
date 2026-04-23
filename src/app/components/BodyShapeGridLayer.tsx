"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { useIsMinWidth640 } from "../lib/use-media-query";
import { usePrefersReducedMotion } from "../lib/motion-pref";

const ShapeGridLazy = lazy(() =>
  import("./ShapeGrid/ShapeGrid").then((m) => ({ default: m.ShapeGrid })),
);

/**
 * Fundo fixo ShapeGrid por baixo das secções pós-hero (z menor que o hero e que o conteúdo).
 * Lazy + idle; viewport abaixo de 640px não monta; reduced motion = grelha estática + hover.
 */
export function BodyShapeGridLayer() {
  const wide = useIsMinWidth640();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [idleReady, setIdleReady] = useState(false);

  useEffect(() => {
    if (!wide) return;
    const run = () => setIdleReady(true);
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(run, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const t = window.setTimeout(run, 200);
    return () => window.clearTimeout(t);
  }, [wide]);

  if (!wide || !idleReady) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden
    >
      <Suspense fallback={null}>
        <ShapeGridLazy
          speed={0.22}
          squareSize={40}
          direction="diagonal"
          borderColor="#2f2a38"
          hoverFillColor="#1a1820"
          shape="square"
          hoverTrailAmount={0}
          staticMotion={prefersReducedMotion}
        />
      </Suspense>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/8 via-transparent to-black/14"
        aria-hidden
      />
    </div>
  );
}
