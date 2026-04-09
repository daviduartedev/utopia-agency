import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Subscrição a matchMedia com hidratação segura (SSR: sempre `false` até montar).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Viewport estreito típico de telemóvel (Tailwind `md` = 768px). */
export function useIsNarrowMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Hero: WebGL pesado — desligar em mobile ou reduced-motion. */
export function useAllowHeavyHeroEffects(): boolean {
  const narrow = useIsNarrowMobile();
  const reduce = usePrefersReducedMotion();
  return !narrow && !reduce;
}

/**
 * Lenis + RAF contínuo pesa em touch; scroll nativo mantém o mesmo layout/conteúdo.
 */
export function useNativeWindowScrollInsteadOfLenis(): boolean {
  return useIsNarrowMobile() || usePrefersReducedMotion();
}
