import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Telefone / viewport estreita (Tailwind `md` = 768px).
 * Otimizações de performance aplicam-se **só** aqui — desktop permanece completo.
 */
export function useIsNarrowMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/** Alinhado ao budget do Plasma / ShapeGrid: animação só a partir de 640px. */
export function useIsMinWidth640(): boolean {
  return useMediaQuery("(min-width: 640px)");
}
