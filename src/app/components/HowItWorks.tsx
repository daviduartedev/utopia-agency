"use client";

import { motion } from "motion/react";
import { BookCallWidget } from "./BookCallWidget";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

const steps: ReadonlyArray<{ num: string; title: string; body: string }> = [
  {
    num: "01",
    title: "Briefing",
    body: "Uma conversa curta ou formulário. A gente entende o que você vende, pra quem e o que você quer que o visitante faça no fim.",
  },
  {
    num: "02",
    title: "Proposta",
    body: "Escopo fechado, prazo e valor na mesma folha. Você olha, aprova ou não. Só paga sinal quando estiver claro.",
  },
  {
    num: "03",
    title: "Layout",
    body: "Você vê a página antes do código. Ajustamos texto e ordem até ficar óbvio: o que é, por que importa, como chamar você.",
  },
  {
    num: "04",
    title: "Publicação",
    body: "Montamos tudo, testamos no celular e colocamos no ar. Você acompanha o link até abrir bonito do seu lado.",
  },
  {
    num: "05",
    title: "Suporte no começo",
    body: "Um mês de ajuste fino depois do lançamento. Dúvida pequena não vira desculpa. A gente responde.",
  },
];

/**
 * HowItWorks estilo Jax Orion — timeline vertical zig-zag com linha pontilhada
 * central conectando os cards alternados.
 */
export function HowItWorks() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="como-funciona"
      aria-labelledby="howitworks-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Processo"
        title="Cinco passos. Você sempre sabe o que vem."
        description="Do primeiro 'oi' à página no ar, sem passo escondido."
        id="howitworks-heading"
      />

      <div className="relative mx-auto mt-16 w-full max-w-4xl px-4 sm:px-8 md:mt-20 md:px-0">
        {/* Linha central pontilhada (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="h-full w-px border-l border-dashed border-white/15" />
        </div>

        <ol className="flex flex-col gap-12 md:gap-16">
          {steps.map((step, i) => {
            const isRight = i % 2 === 1;
            return (
              <motion.li
                key={step.num}
                {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
                className={cn(
                  "relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0",
                  isRight ? "md:justify-end" : "md:justify-start",
                )}
              >
                {/* Bolinha central */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-black bg-white md:block"
                />

                <article
                  className={cn(
                    "relative w-full rounded-3xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur-sm md:w-[calc(50%-2rem)] md:p-8",
                    isRight ? "md:ml-auto" : "md:mr-auto",
                  )}
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Etapa #{step.num}
                  </p>
                  <h3
                    className="mt-3 text-[1.25rem] font-semibold leading-snug tracking-tight text-white md:text-[1.4rem]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-400">
                    {step.body}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 5 })}
        className="mx-auto mt-16 w-full max-w-3xl px-4 sm:px-8 md:px-12"
      >
        <BookCallWidget />
      </motion.div>
    </section>
  );
}
