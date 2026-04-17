import { motion } from "motion/react";
import LogoLoop, { type LogoLoopItem } from "./ui/LogoLoop";

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
 * Logos de clientes em marquee horizontal contínuo; todos mono-cor (zinc-400)
 * via `currentColor` herdado do wrapper.
 */
export function ClientLogos() {
  return (
    <section
      id="clientes"
      aria-labelledby="clientes-heading"
      className="relative z-10 w-full overflow-hidden bg-page-surface py-14 md:py-16"
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
          className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 md:text-xs"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          Quem já trabalhou com a Utopia
        </p>

        <div className="relative w-full text-zinc-400">
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
