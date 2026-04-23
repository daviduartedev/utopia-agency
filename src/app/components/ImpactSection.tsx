import { motion } from "motion/react";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

/**
 * Bloco de impacto pós-hero: a frase forte de “inexistência” fica aqui,
 * não no headline principal (pedido de conversão / hierarquia).
 */
export function ImpactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="impacto"
      aria-labelledby="impacto-heading"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient py-14 pb-16 md:py-20 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8 md:px-12">
        <motion.div {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}>
          <p
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Impacto direto
          </p>
          <h2
            id="impacto-heading"
            className="text-[clamp(1.5rem,4.2vw,2.35rem)] font-medium leading-snug tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Se sua empresa não tem um site, ela praticamente não existe.
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-400 sm:text-base"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Quem procura no celular não acha endereço claro, não vê prova, não clica. Quem acha o
            concorrente acha rápido. O jogo é esse.
          </p>
        </motion.div>
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
