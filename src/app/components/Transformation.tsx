"use client";

import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import LogoLoop, { type LogoLoopItem } from "./ui/LogoLoop";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

const antes = [
  "Busca no Google: some ou aparece fraco.",
  "Contato só por indicação ou post que some.",
  "Mês sem previsão: não sabe de onde vem o próximo cliente.",
];

const depois = [
  "Página diz o que você vende em segundos.",
  "Botão de WhatsApp ou formulário na cara.",
  "Cliente novo sabe onde clicar. Você para de depender só de sorte.",
];

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
 * Antes vs Depois (transformação) + faixa de prova social com logos.
 * Combina duas seções em um único bloco visual.
 */
export function Transformation() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="transformacao"
      aria-labelledby="transformacao-heading"
      className="relative w-full overflow-hidden bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Antes e depois"
        title="Do invisível para quem te procura de verdade"
        description="Mesmo negócio. O que muda é ter um lugar na internet que trabalha por você."
        id="transformacao-heading"
      />

      <div className="mx-auto mt-14 grid w-full max-w-5xl gap-5 px-4 sm:px-8 md:mt-20 md:grid-cols-2 md:px-12">
        <motion.article
          {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0 })}
          className="relative flex flex-col rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-sm md:p-9"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300">
              <X className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h3
              className="text-[1.15rem] font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Antes
            </h3>
          </div>
          <ul className="space-y-3">
            {antes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-zinc-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-400/60" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1 })}
          className="relative flex flex-col rounded-3xl border border-emerald-400/20 bg-emerald-500/[0.04] p-7 backdrop-blur-sm md:p-9"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h3
              className="text-[1.15rem] font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Depois
            </h3>
          </div>
          <ul className="space-y-3">
            {depois.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-zinc-300"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      {/* Faixa de prova social */}
      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 2 })}
        className="mx-auto mt-20 w-full max-w-[1300px] px-4 sm:px-8 md:mt-24 md:px-12"
        id="clientes"
        aria-labelledby="clientes-heading"
      >
        <p
          id="clientes-heading"
          className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          Quem já confiou a presença digital na gente
        </p>
        <div
          className={cn(
            "relative w-full",
            "[&_img]:brightness-0 [&_img]:invert [&_img]:opacity-60 [&_img]:transition-opacity [&_img]:duration-200",
            "hover:[&_img]:opacity-90",
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
            fadeOutColor="#000000"
            ariaLabel="Clientes da Utopia"
            className="w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
