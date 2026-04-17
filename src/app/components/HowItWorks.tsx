import { motion } from "motion/react";
import { BookCallWidget } from "./BookCallWidget";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

const steps = [
  {
    number: "01",
    title: "Briefing",
    body: "Entendemos seu negócio, público e objetivos. Uma chamada rápida ou formulário detalhado — sem burocracia.",
  },
  {
    number: "02",
    title: "Proposta",
    body: "Escopo detalhado, prazo e valor fixo. Você sabe exatamente o que vai receber e quando, antes de confirmar qualquer coisa.",
  },
  {
    number: "03",
    title: "Design",
    body: "Layout aprovado por você antes do código começar. Iterações rápidas em Figma com foco em conversão e identidade.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    body: "Código limpo, stack moderno e links de pré-visualização para acompanhar ao vivo. Você vê o progresso a cada entrega.",
  },
  {
    number: "05",
    title: "Entrega e suporte",
    body: "Produto no ar com domínio, CI/CD e documentação incluídos. Um mês de suporte gratuito para garantir um lançamento sem sustos.",
  },
];

export function HowItWorks() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion, {
    delayIndex: 0,
    lateral: true,
  });

  return (
    <section
      id="como-funciona"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-12 md:py-16"
      aria-labelledby="howitworks-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="howitworks-heading"
          eyebrow="Como funciona"
          title="Do briefing ao lançamento."
          description="Um processo claro em cinco etapas — para você saber o que esperar em cada fase."
          className="mb-12 md:mb-16"
        />
      </motion.div>

      <div className="mx-auto max-w-[900px] px-4 sm:px-8 md:px-12">
        <ol className="relative">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              {...scrollRevealMotion(prefersReducedMotion, {
                delayIndex: i,
                lateral: true,
              })}
              className="relative list-none pb-12 last:pb-0"
            >
              <div className="relative flex gap-5 md:gap-8">
                <div className="flex w-12 shrink-0 flex-col items-stretch md:w-14">
                  <div className="flex flex-1 flex-col items-center">
                    <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-page-surface text-[11px] font-semibold tabular-nums text-zinc-300 md:size-12 md:text-xs">
                      {step.number}
                    </span>
                    {i < steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="mt-2 w-px flex-1 bg-gradient-to-b from-white/30 via-white/12 to-white/5 md:min-h-[3.5rem]"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0 flex-1 pb-1 pt-0.5">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-7">
                    <h3
                      className="mb-3 text-base font-semibold tracking-[-0.01em] text-white"
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                      }}
                    >
                      <span className="text-zinc-500">{step.number} ·</span>{" "}
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-zinc-400"
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          {...scrollRevealMotion(prefersReducedMotion, {
            delayIndex: 5,
            lateral: true,
          })}
          className="mx-auto mt-6 max-w-xl md:mt-10"
        >
          <BookCallWidget />
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
