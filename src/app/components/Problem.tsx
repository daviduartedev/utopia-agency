import { motion } from "motion/react";
import { Search, Share2, Wallet } from "lucide-react";
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
    title: "Busca no Google, você não aparece",
    body: "Cliente digita o serviço na cidade. Aparece mapa, foto, avaliação do outro. Você nem entra na briga. O orçamento nasce ali, e não no seu WhatsApp.",
    icon: <Search className="size-4 text-amber-400" strokeWidth={1.75} />,
    accent: "from-amber-500/30 to-amber-500/5",
  },
  {
    title: "Só indicação e post não enchem agenda",
    body: "Feed some. Grupo esfria. Indicação vem quando vem. Sem página séria, você fica refém de sorte e não sabe quanto entra no mês.",
    icon: <Share2 className="size-4 text-violet-400" strokeWidth={1.75} />,
    accent: "from-violet-500/30 to-violet-500/5",
  },
  {
    title: "Sem presença clara, não fecha",
    body: "Gente nova abre o link e desconfia. Sem prova, sem texto direto e sem chamada óbvia, ela chama quem parece mais estabelecido. Você perde na primeira impressão.",
    icon: <Wallet className="size-4 text-sky-400" strokeWidth={1.75} />,
    accent: "from-sky-500/30 to-sky-500/5",
  },
];

export function Problem() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion, {
    delayIndex: 0,
    lateral: true,
  });

  return (
    <section
      id="problema"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient py-12 md:py-16"
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
          eyebrow="O que está errado hoje"
          title="Três jeitos de perder cliente sem perceber"
          description="Não é preguiça sua. É falta de lugar na internet que explica, prova e pede contato."
          className="mb-12 md:mb-16"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <ol className="relative space-y-0">
          {painPoints.map((pain, i) => (
            <motion.li
              key={pain.title}
              {...scrollRevealMotion(prefersReducedMotion, {
                delayIndex: i,
                lateral: true,
              })}
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
