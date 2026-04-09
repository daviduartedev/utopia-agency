import { cn } from "./ui/utils";

/** Marca visual: mesmo ativo do favicon (PNG com transparência em /public). */
const LOGO_SRC = "/favicon.png";

type BrandLogoProps = {
  className?: string;
  /** Tamanho do símbolo (ícone). */
  imgClassName?: string;
  /** Classes extras no texto “utopia”. */
  wordmarkClassName?: string;
};

export function BrandLogo({
  className,
  imgClassName,
  wordmarkClassName,
}: BrandLogoProps) {
  return (
    <a
      href="#inicio"
      className={cn(
        "group flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface",
        className,
      )}
      aria-label="Utopia — início"
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
          "text-[20px] font-bold tracking-wide text-white md:text-[22px]",
          wordmarkClassName,
        )}
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        utopia
      </span>
    </a>
  );
}
