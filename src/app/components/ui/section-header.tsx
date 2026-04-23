import { cn } from "./utils";

export interface SectionHeaderProps {
  /** Título principal da seção (único h2) */
  title: string;
  /** Linha pequena opcional acima do título */
  eyebrow?: string;
  /** Parágrafo de apoio abaixo do título */
  description?: string;
  /** Margem título→descrição um pouco menor (ex.: serviços). */
  compactDescription?: boolean;
  id?: string;
  className?: string;
}

/**
 * Cabeçalho consistente para seções: título claro + texto de apoio suave.
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
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-[clamp(1.65rem,3.8vw,2.6rem)] font-medium leading-[1.22] tracking-[-0.02em] text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mx-auto max-w-2xl text-base font-normal leading-relaxed text-zinc-400 md:text-lg",
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
