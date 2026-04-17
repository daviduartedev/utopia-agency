import { motion } from "motion/react";
import { ArrowDownRight, Ghost, Hourglass } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type PainPoint = {
  title: string;
  body: string;
  icon: React.ReactNode;
  accent: string;
};

const painPoints: PainPoint[] = [
  {
    title: "Visita que não vira contato",
    body: "O tráfego chega, mas ninguém te chama. A página não diz o que você vende, não aponta um próximo passo claro e o visitante sai antes de decidir.",
    icon: <ArrowDownRight className="size-4 text-amber-400" strokeWidth={1.75} />,
    accent: "from-amber-500/30 to-amber-500/5",
  },
  {
    title: "Orçamento caro, prazo longo, proposta burocrática",
    body: "Você pede um site e recebe um PDF de 30 páginas, cronograma de três meses e uma fatura que só faz sentido para uma grande empresa. O projeto nunca sai do papel.",
    icon: <Hourglass className="size-4 text-violet-400" strokeWidth={1.75} />,
    accent: "from-violet-500/30 to-violet-500/5",
  },
  {
    title: "Agência que some depois da entrega",
    body: "O site vai ao ar, o suporte some. Um bug pequeno vira semana parada. Qualquer evolução exige um novo contrato.",
    icon: <Ghost className="size-4 text-sky-400" strokeWidth={1.75} />,
    accent: "from-sky-500/30 to-sky-500/5",
  },
];

export function Problem() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion);

  return (
    <section
      id="problema"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="problema-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="problema-heading"
          eyebrow="O problema"
          title="Seu site hoje não está fazendo a parte dele."
          description="Três situações que consomem oportunidade todo mês — e que a gente resolve por padrão."
          className="mb-12 md:mb-16"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <ol className="relative space-y-0">
          {painPoints.map((pain, i) => (
            <motion.li
              key={pain.title}
              {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
              className="relative list-none"
            >
              <div className="flex gap-5 pb-12 md:gap-8 md:pb-14 lg:gap-10">
                <div className="flex w-12 shrink-0 flex-col items-center md:w-16">
                  <span
                    aria-hidden
                    className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-page-surface text-[10px] font-semibold tabular-nums text-zinc-400 md:size-12 md:text-[11px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < painPoints.length - 1 ? (
                    <span
                      aria-hidden
                      className="mt-2 w-px flex-1 min-h-[2.5rem] bg-gradient-to-b from-white/25 to-white/5"
                    />
                  ) : null}
                </div>

                <div
                  className={`min-w-0 flex-1 rounded-2xl border border-white/10 bg-gradient-to-br p-6 sm:p-7 md:p-8 ${pain.accent}`}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/25">
                      {pain.icon}
                    </span>
                    <h3
                      className="min-w-0 flex-1 text-base font-semibold text-white sm:text-[17px]"
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                      }}
                    >
                      {pain.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                    }}
                  >
                    {pain.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
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
