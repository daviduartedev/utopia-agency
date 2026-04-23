import type { MouseEventHandler } from "react";
import { cn } from "./ui/utils";

/** Marca no header/footer; `public/logo.png`. Favicons: `public/favicon.ico`, PNGs e `site.webmanifest` (index.html). */
const LOGO_SRC = "/logo.png";

type BrandLogoProps = {
  className?: string;
  /** Tamanho do símbolo (ícone). */
  imgClassName?: string;
  /** Classes extras no texto “utopia”. */
  wordmarkClassName?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function BrandLogo({
  className,
  imgClassName,
  wordmarkClassName,
  onClick,
}: BrandLogoProps) {
  return (
    <a
      href="#inicio"
      onClick={onClick}
      className={cn(
        "group flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface",
        className,
      )}
      aria-label="Utopia, início"
    >
      <img
        src={LOGO_SRC}
        alt=""
        width={40}
        height={40}
        decoding="async"
        className={cn(
          "size-8 object-contain transition-transform duration-200 group-hover:scale-[1.04] md:size-9",
          imgClassName,
        )}
      />
      <span
        className={cn(
          "inline-flex items-baseline gap-0.5 text-[20px] font-bold tracking-wide text-white md:text-[22px]",
          wordmarkClassName,
        )}
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        <span className="leading-none">utopia</span>
        <sup
          className="ml-px translate-y-[-0.06em] text-[0.42em] font-semibold leading-none tracking-tight text-zinc-400"
          aria-hidden
        >
          SM
        </sup>
      </span>
    </a>
  );
}
