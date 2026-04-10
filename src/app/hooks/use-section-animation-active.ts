"use client";

import { useEffect, useRef, useState } from "react";

/**
 * `true` quando a secção intersecta o viewport (com margem).
 * Usado para pausar CSS animations fora da tela e aliviar GPU/CPU.
 */
export function useSectionAnimationActive(rootMargin = "0px 0px 12% 0px") {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { root: null, rootMargin, threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, active };
}
