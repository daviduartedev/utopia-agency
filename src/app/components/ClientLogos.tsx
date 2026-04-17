import { motion } from "motion/react";
import LogoLoop, { type LogoLoopItem } from "./ui/LogoLoop";
import { cn } from "./ui/utils";

const clientLogos: LogoLoopItem[] = [
  { src: "/logos/acme.svg", alt: "Acme", title: "Acme" },
  { src: "/logos/northwind.svg", alt: "Northwind", title: "Northwind" },
  { src: "/logos/helix-labs.svg", alt: "Helix Labs", title: "Helix Labs" },
  { src: "/logos/umbra.svg", alt: "Umbra", title: "Umbra" },
  { src: "/logos/tessera.svg", alt: "Tessera", title: "Tessera" },
  { src: "/logos/lumen.svg", alt: "Lumen", title: "Lumen" },
  { src: "/logos/paraglide.svg", alt: "Paraglide", title: "Paraglide" },
  { src: "/logos/vantage.svg", alt: "Vantage", title: "Vantage" },
];

/**
 * Prova social rápida, logo abaixo da seção Problema.
 * SVGs em <img> não herdam currentColor no DOM — aplicamos filtro claro no wrapper.
 */
export function ClientLogos() {
  return (
    <section
      id="clientes"
      aria-labelledby="clientes-heading"
      className="relative z-10 w-full overflow-hidden bg-page-surface py-10 md:py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12"
      >
        <p
          id="clientes-heading"
          className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-300 md:text-xs"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          Quem já trabalhou com a Utopia
        </p>

        <div
          className={cn(
            "relative w-full",
            "[&_img]:brightness-0 [&_img]:invert [&_img]:opacity-90 [&_img]:transition-opacity [&_img]:duration-200",
            "hover:[&_img]:opacity-100",
          )}
        >
          <LogoLoop
            logos={clientLogos}
            speed={60}
            direction="left"
            logoHeight={32}
            gap={64}
            hoverSpeed={0}
            pauseOnHover
            fadeOut
            fadeOutColor="#0a0a0a"
            ariaLabel="Clientes da Utopia"
            className="w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
