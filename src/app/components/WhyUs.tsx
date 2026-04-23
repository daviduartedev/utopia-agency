import { motion } from "motion/react";
import {
  MessageSquare,
  PackageCheck,
  Star,
  Zap,
} from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type FeatureCell = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
  barClass: string;
};

const features: FeatureCell[] = [
  {
    title: "Cliente te acha mais rápido",
    description:
      "Página organizada pra quem busca no celular. Menos “quem é esse?” e mais gente chegando no seu contato com intenção.",
    icon: <Zap className="size-5 text-amber-300" strokeWidth={1.75} />,
    status: "Resultado",
    barClass: "bg-amber-400/85",
  },
  {
    title: "Você para de passar vergonha no link",
    description:
      "Texto direto, visual limpo, prova onde precisa. Quem clica entende o que compra e por que confiar.",
    icon: <Star className="size-5 text-violet-300" strokeWidth={1.75} />,
    status: "Credibilidade",
    barClass: "bg-violet-400/85",
  },
  {
    title: "Você sabe o que está pagando",
    description:
      "Combinamos escopo e prazo por escrito. Sem surpresa no meio. Sem sumiço depois que publica.",
    icon: <MessageSquare className="size-5 text-sky-300" strokeWidth={1.75} />,
    status: "Clareza",
    barClass: "bg-sky-400/85",
  },
  {
    title: "Tudo no mesmo pacote",
    description:
      "Endereço do site, hospedagem e página no ar. Você não fica com arquivo morto que ninguém sabe colocar online.",
    icon: <PackageCheck className="size-5 text-emerald-300" strokeWidth={1.75} />,
    status: "No ar de verdade",
    barClass: "bg-emerald-400/85",
  },
];

export function WhyUs() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion, {
    delayIndex: 0,
    lateral: true,
  });

  return (
    <section
      id="diferenciais"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient py-12 md:py-16"
      aria-labelledby="whyus-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="whyus-heading"
          eyebrow="O que você ganha"
          title="Menos promessa vazia. Mais contato entrando."
          description="Não vendemos tecnologia. Entregamos presença que explica, convence e chama."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            {features.map((item, index) => (
              <article
                key={item.title}
                className="bg-zinc-950/80 p-6 sm:p-8 md:p-9"
              >
                <motion.div
                  {...scrollRevealMotion(prefersReducedMotion, {
                    delayIndex: index,
                    lateral: true,
                  })}
                  className="flex h-full flex-col"
                >
                  <div
                    className={`mb-5 h-1 w-11 shrink-0 rounded-full ${item.barClass}`}
                    aria-hidden
                  />
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] sm:size-12">
                      {item.icon}
                    </span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold tracking-[-0.02em] text-white md:text-xl"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-zinc-400 md:text-[15px]"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </article>
            ))}
          </div>
        </div>
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
