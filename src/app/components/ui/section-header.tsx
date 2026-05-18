import { cn } from "./utils";

export interface SectionHeaderProps {
  /** Título principal da seção (único h2) */
  title: string;
  /** Linha pequena opcional acima do título — renderizada como pill */
  eyebrow?: string;
  /** Parágrafo de apoio abaixo do título */
  description?: string;
  /** Margem título→descrição um pouco menor (ex.: serviços). */
  compactDescription?: boolean;
  id?: string;
  className?: string;
}

/**
 * Cabeçalho consistente para seções: pill eyebrow + título display grande + texto de apoio.
 * Visual inspirado em template Jax Orion: pill preta arredondada com label compacta uppercase.
 */
export function SectionHeader({
  title,
  eyebrow,
  description,
  compactDescription,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-[1300px] px-4 text-center sm:px-8 md:px-12", className)}>
      {eyebrow ? (
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white/65 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/65 shadow-[0_10px_30px_rgba(24,24,24,0.06)] backdrop-blur">
            {eyebrow}
          </span>
        </div>
      ) : null}
      <h2
        id={id}
        className="mx-auto max-w-4xl text-[clamp(2rem,5.2vw,3.6rem)] font-bold leading-[1.05] text-black"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mx-auto max-w-xl text-[15px] font-normal leading-relaxed text-black/62 md:text-base",
            compactDescription ? "mt-3 md:mt-3.5" : "mt-5",
          )}
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
