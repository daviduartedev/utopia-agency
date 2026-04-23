import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
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

export function Transformation() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion, {
    delayIndex: 0,
    lateral: true,
  });

  return (
    <section
      id="transformacao"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient pb-12 pt-12 md:pb-16 md:pt-16"
      aria-labelledby="transformacao-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="transformacao-heading"
          eyebrow="Antes e depois"
          title="Do invisível para quem te procura de verdade"
          description="Mesmo negócio. O que muda é ter um lugar na internet que trabalha por você."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto grid max-w-[1300px] gap-6 px-4 sm:px-8 md:grid-cols-2 md:gap-8 md:px-12">
        <motion.article
          {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/25 to-transparent p-6 sm:p-8"
        >
          <h3
            className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-red-300/90"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Antes
          </h3>
          <ul className="space-y-4 text-[15px] leading-relaxed text-zinc-300">
            {antes.map((line) => (
              <li
                key={line}
                className="border-l-2 border-red-500/35 pl-4"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {line}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1, lateral: true })}
          className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-transparent p-6 sm:p-8"
        >
          <h3
            className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300/90"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Depois
          </h3>
          <ul className="space-y-4 text-[15px] leading-relaxed text-zinc-200">
            {depois.map((line) => (
              <li
                key={line}
                className="border-l-2 border-emerald-500/40 pl-4"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {line}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
