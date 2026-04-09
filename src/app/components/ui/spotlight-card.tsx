import * as React from "react";

import { cn } from "./utils";

export type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Cor do brilho em formato `R, G, B` (ex.: `255, 255, 255`). */
  spotlightRgb?: string;
  /** Raio aproximado do gradiente em px. */
  spotlightRadius?: number;
};

/**
 * Card com spotlight que segue o cursor (padrão tipo easemize / 21st.dev).
 */
export function SpotlightCard({
  className,
  children,
  spotlightRgb = "255, 255, 255",
  spotlightRadius = 520,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const setSpot = React.useCallback((x: string, y: string) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spotlight-x", x);
    el.style.setProperty("--spotlight-y", y);
  }, []);

  const centerSpot = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setSpot(`${width / 2}px`, `${height / 2}px`);
  }, [setSpot]);

  React.useLayoutEffect(() => {
    centerSpot();
  }, [centerSpot]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot(`${e.clientX - r.left}px`, `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={centerSpot}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500",
          "opacity-0 group-hover:opacity-100",
          "[@media(hover:none)]:opacity-[0.08] [@media(hover:none)]:group-hover:opacity-[0.08]",
          "motion-reduce:opacity-[0.05] motion-reduce:group-hover:opacity-[0.05]",
        )}
        style={{
          background: `radial-gradient(${spotlightRadius}px circle at var(--spotlight-x) var(--spotlight-y), rgba(${spotlightRgb}, 0.18), transparent 50%)`,
        }}
      />
      <div className="relative z-[1] h-full min-h-0">{children}</div>
    </div>
  );
}
